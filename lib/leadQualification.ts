// Lead Qualification Utilities
export interface QualifiedLead {
  id: string;
  timestamp: string;
  source: string;

  // Contact Info
  name: string;
  email: string;
  phone: string;
  company: string;

  // Project Details
  projectType: string;
  budget: string;
  timeline: string;
  urgency: string;

  // Qualification Data
  decisionMaker: string;
  currentSolution: string;
  teamSize: string;
  technicalExpertise: string;
  specificRequirements: string[];
  message: string;

  // Scoring
  leadScore: number;
  leadQuality: "hot" | "warm" | "cold";

  // Metadata
  userAgent: string;
  referrer: string;
  sessionData?: any;
}

export const calculateLeadScore = (
  formData: any
): { score: number; quality: "hot" | "warm" | "cold" } => {
  let score = 0;

  // Budget scoring (40% weight)
  const budgetScores = {
    "over-50m": 40,
    "30-50m": 30,
    "10-30m": 20,
    "under-10m": 10,
    discuss: 15,
  };
  score += budgetScores[formData.budget as keyof typeof budgetScores] || 0;

  // Decision making power (25% weight)
  const decisionScores = {
    yes: 25,
    influence: 15,
    no: 5,
  };
  score +=
    decisionScores[formData.decisionMaker as keyof typeof decisionScores] || 0;

  // Urgency (20% weight)
  const urgencyScores = {
    immediate: 20,
    month: 15,
    quarter: 10,
    research: 2,
  };
  score += urgencyScores[formData.urgency as keyof typeof urgencyScores] || 0;

  // Timeline (10% weight)
  const timelineScores = {
    immediate: 10,
    "1-month": 8,
    "2-3-months": 5,
    flexible: 3,
  };
  score +=
    timelineScores[formData.timeline as keyof typeof timelineScores] || 0;

  // Company/Team size (5% weight)
  if (formData.company?.length > 0) score += 2;
  const teamScores = {
    large: 3,
    medium: 2,
    small: 1,
    individual: 0,
  };
  score += teamScores[formData.teamSize as keyof typeof teamScores] || 0;

  // Determine quality
  const quality = score >= 70 ? "hot" : score >= 40 ? "warm" : "cold";

  return { score, quality };
};

export const getNextActionForLead = (
  leadQuality: string,
  leadScore: number
) => {
  switch (leadQuality) {
    case "hot":
      return {
        action: "immediate_call",
        timeframe: "2 hours",
        priority: "high",
        message: "Liên hệ ngay lập tức! Lead chất lượng cao.",
        autoActions: [
          "send_priority_email",
          "schedule_call",
          "notify_sales_team",
        ],
      };

    case "warm":
      return {
        action: "follow_up_call",
        timeframe: "24 hours",
        priority: "medium",
        message: "Gọi điện tư vấn trong 24h",
        autoActions: ["send_follow_up_email", "add_to_nurture_sequence"],
      };

    default:
      return {
        action: "email_nurture",
        timeframe: "3-7 days",
        priority: "low",
        message: "Bổ sung thông tin và theo dõi định kỳ",
        autoActions: ["send_educational_content", "add_to_monthly_newsletter"],
      };
  }
};

export const formatLeadForCRM = (formData: any): QualifiedLead => {
  const { score, quality } = calculateLeadScore(formData);

  return {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    source: "website_contact_form",

    // Contact info
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company || "N/A",

    // Project details
    projectType: formData.projectType,
    budget: formData.budget,
    timeline: formData.timeline,
    urgency: formData.urgency,

    // Qualification
    decisionMaker: formData.decisionMaker,
    currentSolution: formData.currentSolution,
    teamSize: formData.teamSize,
    technicalExpertise: formData.technicalExpertise,
    specificRequirements: formData.specificRequirements || [],
    message: formData.message,

    // Scoring
    leadScore: score,
    leadQuality: quality,

    // Metadata
    userAgent: typeof window !== "undefined" ? navigator.userAgent : "N/A",
    referrer: typeof window !== "undefined" ? document.referrer : "N/A",
  };
};

// Lead Storage (temporary - replace with real backend)
export const storeLeadLocally = (lead: QualifiedLead) => {
  if (typeof window === "undefined") return;

  const existingLeads = JSON.parse(
    localStorage.getItem("qualified_leads") || "[]"
  );
  existingLeads.push(lead);
  localStorage.setItem("qualified_leads", JSON.stringify(existingLeads));

  // Also store in sessionStorage for immediate access
  sessionStorage.setItem("latest_lead", JSON.stringify(lead));
};

export const getStoredLeads = (): QualifiedLead[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("qualified_leads") || "[]");
};

// Email templates based on lead quality
export const getEmailTemplate = (lead: QualifiedLead) => {
  const templates = {
    hot: {
      subject: `🔥 [URGENT] Báo giá ${lead.projectType} - ${lead.name}`,
      body: `
Kính chào ${lead.name},

Cảm ơn bạn đã quan tâm đến dịch vụ của LocDo.Tech!

Dự án ${lead.projectType} với ngân sách ${
        lead.budget
      } của bạn rất phù hợp với chuyên môn của chúng tôi.

Để tư vấn chi tiết và đưa ra báo giá chính xác nhất, tôi sẽ gọi điện cho bạn trong 2h tới.

Thời gian thuận tiện: ${new Date(
        Date.now() + 2 * 60 * 60 * 1000
      ).toLocaleString("vi-VN")}

Trân trọng,
Do Xuan Loc - Founder LocDo.Tech
📞 ${lead.phone}
      `,
    },

    warm: {
      subject: `⭐ Báo giá ${lead.projectType} - Tư vấn miễn phí`,
      body: `
Kính chào ${lead.name},

Cảm ơn bạn đã liên hệ với LocDo.Tech!

Chúng tôi đã ghi nhận yêu cầu ${lead.projectType} của bạn và sẽ chuẩn bị báo giá chi tiết.

Team sẽ liên hệ với bạn trong 24h để:
- Tư vấn giải pháp phù hợp nhất
- Báo giá chi tiết và timeline
- Giải đáp mọi thắc mắc

Trong thời gian chờ đợi, bạn có thể tham khảo portfolio: https://locdo.tech/portfolio

Trân trọng,
LocDo.Tech Team
      `,
    },

    cold: {
      subject: `📋 Thông tin dịch vụ ${lead.projectType}`,
      body: `
Kính chào ${lead.name},

Cảm ơn bạn đã quan tâm đến LocDo.Tech!

Chúng tôi đã ghi nhận yêu cầu của bạn và sẽ gửi thông tin chi tiết qua email này.

Để hiểu rõ hơn về nhu cầu, team sẽ liên hệ với bạn trong vòng 3-5 ngày làm việc.

Bạn cũng có thể tham khảo:
- Blog kỹ thuật: https://locdo.tech/blog
- Case studies: https://locdo.tech/portfolio

Trân trọng,
LocDo.Tech Team
      `,
    },
  };

  return templates[lead.leadQuality];
};
