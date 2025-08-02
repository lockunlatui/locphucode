// Simple Email Notification System
import { QualifiedLead } from "./leadQualification";

// Simple configuration - gửi email đến locdx@locdo.tech
const EMAIL_CONFIG = {
  enabled: true,
  toEmail: "locdx@locdo.tech",
  fromEmail: "noreply@locdo.tech",
};

export const sendEmailNotification = async (lead: QualifiedLead) => {
  console.log("📧 Sending email notification to locdx@locdo.tech...", lead);

  try {
    const subject = `🔥 New ${lead.leadQuality.toUpperCase()} Lead: ${
      lead.name
    } - ${lead.projectType}`;

    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${
      lead.leadQuality === "hot"
        ? "#e53e3e"
        : lead.leadQuality === "warm"
        ? "#dd6b20"
        : "#4a5568"
    }; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
    .score { font-size: 24px; font-weight: bold; }
    .section { margin: 15px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid ${
      lead.leadQuality === "hot"
        ? "#e53e3e"
        : lead.leadQuality === "warm"
        ? "#dd6b20"
        : "#4a5568"
    }; }
    .urgent { background: #fed7d7; border: 2px solid #e53e3e; }
    .button { background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${
        lead.leadQuality === "hot"
          ? "🔥"
          : lead.leadQuality === "warm"
          ? "⭐"
          : "📋"
      } NEW LEAD ALERT</h1>
      <div class="score">Score: ${
        lead.leadScore
      }/100 - ${lead.leadQuality.toUpperCase()}</div>
    </div>
    
    <div class="content">
      ${
        lead.leadQuality === "hot"
          ? '<div class="section urgent"><h3>⚠️ URGENT - HOT LEAD!</h3><p><strong>Gọi ngay trong vòng 2 tiếng để có tỷ lệ chốt cao nhất!</strong></p></div>'
          : ""
      }
      
      <div class="grid">
        <div class="section">
          <h3>👤 Thông Tin Liên Hệ</h3>
          <p><strong>Tên:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${lead.email}">${
      lead.email
    }</a></p>
          <p><strong>Điện thoại:</strong> <a href="tel:${lead.phone}">${
      lead.phone
    }</a></p>
          <p><strong>Công ty:</strong> ${lead.company}</p>
        </div>
        
        <div class="section">
          <h3>💼 Dự Án</h3>
          <p><strong>Loại:</strong> ${lead.projectType}</p>
          <p><strong>Ngân sách:</strong> ${lead.budget}</p>
          <p><strong>Timeline:</strong> ${lead.timeline}</p>
          <p><strong>Độ khẩn cấp:</strong> ${lead.urgency}</p>
          <p><strong>Quyết định:</strong> ${lead.decisionMaker}</p>
        </div>
      </div>
      
      <div class="section">
        <h3>📝 Tin Nhắn Khách Hàng</h3>
        <p style="font-style: italic; background: #f1f5f9; padding: 15px; border-radius: 6px;">"${
          lead.message
        }"</p>
      </div>
      
      <div class="section">
        <h3>🎯 Hành Động Tiếp Theo</h3>
        ${
          lead.leadQuality === "hot"
            ? '<p style="color: #e53e3e;"><strong>🚨 GỌI NGAY!</strong> Đây là lead chất lượng cao, cần liên hệ trong 2 tiếng.</p>'
            : lead.leadQuality === "warm"
            ? '<p style="color: #dd6b20;"><strong>📞 Gọi trong 24h</strong> để có tỷ lệ chuyển đổi tốt nhất.</p>'
            : "<p><strong>📧 Email follow-up</strong> trong vòng 3 ngày.</p>"
        }
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="mailto:${lead.email}?subject=Re: ${
      lead.projectType
    } Project&body=Chào ${
      lead.name
    },%0D%0A%0D%0ACảm ơn bạn đã liên hệ với LocDo Tech..." class="button">📧 Trả lời Email</a>
          <a href="tel:${lead.phone}" class="button">📞 Gọi Ngay</a>
        </div>
      </div>
      
      <div class="section">
        <h3>📊 Chi Tiết Lead</h3>
        <p><strong>Thời gian:</strong> ${new Date(
          lead.timestamp
        ).toLocaleString("vi-VN")}</p>
        <p><strong>Nguồn:</strong> ${lead.source}</p>
        <p><strong>Referrer:</strong> ${lead.referrer || "Direct"}</p>
        <p><strong>Lead ID:</strong> ${lead.id}</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Gửi email qua API route (sử dụng đường dẫn tuyệt đối)
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: EMAIL_CONFIG.toEmail,
        subject,
        html: emailBody,
        priority: lead.leadQuality === "hot" ? "HIGH" : "NORMAL",
        lead_id: lead.id,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Email sent successfully to locdx@locdo.tech:", result);
      return { success: true, result };
    } else {
      const error = await response.text();
      console.error("❌ Failed to send email:", error);
      return { success: false, error };
    }
  } catch (error) {
    console.error("❌ Email notification failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Browser notification as backup
export const sendBrowserNotification = (lead: QualifiedLead) => {
  if ("Notification" in window && Notification.permission === "granted") {
    const emoji =
      lead.leadQuality === "hot"
        ? "🔥"
        : lead.leadQuality === "warm"
        ? "⭐"
        : "📋";

    new Notification(`${emoji} New ${lead.leadQuality} Lead: ${lead.name}`, {
      body: `${lead.projectType} | Budget: ${lead.budget} | Score: ${lead.leadScore}/100`,
      icon: "/favicon.ico",
      tag: `lead-${lead.id}`,
      requireInteraction: lead.leadQuality === "hot",
    });
  }
};

// Request notification permission
export const requestNotificationPermission = () => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
};
