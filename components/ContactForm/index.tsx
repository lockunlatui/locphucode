"use client";
import { useState, useEffect } from "react";
import { trackLeadGeneration, trackBusinessEvent } from "@/lib/analytics";
import {
  calculateLeadScore,
  formatLeadForCRM,
  storeLeadLocally,
  getNextActionForLead,
  getEmailTemplate,
} from "@/lib/leadQualification";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  t: (key: string) => string;
}

interface LeadData {
  // Basic Info
  name: string;
  email: string;
  phone: string;
  company: string;

  // Project Details
  projectType: string;
  budget: string;
  timeline: string;
  urgency: string;

  // Qualification
  decisionMaker: string;
  currentSolution: string;
  teamSize: string;
  technicalExpertise: string;

  // Requirements
  message: string;
  specificRequirements: string[];

  // Lead Scoring
  leadScore: number;
  leadQuality: "hot" | "warm" | "cold";
}

export default function ContactForm({ t }: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    urgency: "",
    decisionMaker: "",
    currentSolution: "",
    teamSize: "",
    technicalExpertise: "",
    message: "",
    specificRequirements: [],
    leadScore: 0,
    leadQuality: "cold",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadScore, setLeadScore] = useState(0);

  // Request notification permission on component mount
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const { requestNotificationPermission } = await import(
          "../../lib/notifications"
        );
        requestNotificationPermission();
      } catch (error) {
        console.log("Notification permission request failed:", error);
      }
    };

    requestPermission();
  }, []);

  // Lead Scoring Algorithm
  useEffect(() => {
    const { score, quality } = calculateLeadScore(formData);
    setLeadScore(score);
    setFormData((prev) => ({
      ...prev,
      leadScore: score,
      leadQuality: quality,
    }));

    // Track lead score change
    if (score > 0) {
      trackBusinessEvent("lead_score_calculated", {
        score,
        quality,
        step: currentStep,
      });
    }
  }, [
    formData.budget,
    formData.decisionMaker,
    formData.urgency,
    formData.timeline,
    formData.company,
    formData.teamSize,
    currentStep,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format lead for CRM
      const qualifiedLead = formatLeadForCRM(formData);

      // Store lead locally (replace with real backend)
      storeLeadLocally(qualifiedLead);

      // Get next actions based on lead quality
      const nextAction = getNextActionForLead(
        formData.leadQuality,
        formData.leadScore
      );
      const emailTemplate = getEmailTemplate(qualifiedLead);

      // Enhanced lead tracking
      trackLeadGeneration(
        "contact_form",
        formData.projectType,
        formData.budget
      );
      trackBusinessEvent("qualified_lead_submitted", {
        lead_id: qualifiedLead.id,
        lead_score: formData.leadScore,
        lead_quality: formData.leadQuality,
        project_type: formData.projectType,
        budget_range: formData.budget,
        decision_maker: formData.decisionMaker,
        urgency: formData.urgency,
        steps_completed: currentStep,
        next_action: nextAction.action,
        priority: nextAction.priority,
      });

      // 🚀 GỬI EMAIL NOTIFICATION ĐẾN locdx@locdo.tech
      try {
        const { sendEmailNotification, sendBrowserNotification } = await import(
          "../../lib/notifications-simple"
        );

        // Gửi email đến locdx@locdo.tech
        const emailResult = await sendEmailNotification(qualifiedLead);
        console.log(
          "✅ Email notification sent to locdx@locdo.tech:",
          emailResult
        );

        // Browser notification backup
        sendBrowserNotification(qualifiedLead);

        // Track notification success
        trackBusinessEvent("lead_notification_sent", {
          lead_id: qualifiedLead.id,
          email_success: emailResult.success,
          recipient: "locdx@locdo.tech",
        });
      } catch (error) {
        console.error("❌ Failed to send email notification:", error);

        // Track notification failure
        trackBusinessEvent("lead_notification_failed", {
          lead_id: qualifiedLead.id,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }

      console.log("Qualified Lead Submitted:", qualifiedLead);
      console.log("Next Action:", nextAction);
      console.log("Email Template:", emailTemplate);

      // Success state
      setCurrentStep(5); // Success step

      // Auto-actions based on lead quality
      if (formData.leadQuality === "hot") {
        // High priority leads - immediate booking
        setTimeout(() => {
          window.open(
            "https://calendly.com/locdo-tech/urgent-consultation",
            "_blank"
          );
        }, 2000);

        // Trigger high priority notifications
        trackBusinessEvent("hot_lead_notification", {
          lead_id: qualifiedLead.id,
          action: "calendar_booking_opened",
        });
      } else if (formData.leadQuality === "warm") {
        // Medium priority - offer booking
        setTimeout(() => {
          if (confirm("Bạn có muốn đặt lịch tư vấn trực tiếp không?")) {
            window.open(
              "https://calendly.com/locdo-tech/consultation",
              "_blank"
            );
          }
        }, 3000);
      }
    } catch (error) {
      trackBusinessEvent("form_submission_error", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    trackBusinessEvent("form_step_completed", { step: currentStep });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (field: keyof LeadData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      specificRequirements: prev.specificRequirements.includes(requirement)
        ? prev.specificRequirements.filter((r) => r !== requirement)
        : [...prev.specificRequirements, requirement],
    }));
  };

  // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h3>Thông tin liên hệ</h3>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Họ và tên *"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="tel"
                placeholder="Số điện thoại *"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Công ty/Tổ chức"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContent}>
            <h3>Chi tiết dự án</h3>
            <div className={styles.formGroup}>
              <select
                value={formData.projectType}
                onChange={(e) => updateFormData("projectType", e.target.value)}
                required
              >
                <option value="">Loại dự án quan tâm *</option>
                <option value="website">Website/Landing Page</option>
                <option value="ecommerce">E-commerce Platform</option>
                <option value="mobile">Mobile App (iOS/Android)</option>
                <option value="system">Hệ thống quản lý (CRM/ERP)</option>
                <option value="api">API/Backend Development</option>
                <option value="consulting">Tư vấn kỹ thuật</option>
                <option value="optimization">Tối ưu hệ thống hiện tại</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <select
                value={formData.budget}
                onChange={(e) => updateFormData("budget", e.target.value)}
                required
              >
                <option value="">Ngân sách dự kiến *</option>
                <option value="under-10m">Dưới 10 triệu</option>
                <option value="10-30m">10-30 triệu</option>
                <option value="30-50m">30-50 triệu</option>
                <option value="over-50m">Trên 50 triệu</option>
                <option value="discuss">Trao đổi trực tiếp</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <select
                value={formData.timeline}
                onChange={(e) => updateFormData("timeline", e.target.value)}
                required
              >
                <option value="">Thời gian triển khai mong muốn *</option>
                <option value="immediate">Ngay lập tức (trong tuần)</option>
                <option value="1-month">1 tháng</option>
                <option value="2-3-months">2-3 tháng</option>
                <option value="flexible">Linh hoạt</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h3>Qualification Questions</h3>
            <div className={styles.formGroup}>
              <label>Bạn có quyền quyết định trong dự án này?</label>
              <select
                value={formData.decisionMaker}
                onChange={(e) =>
                  updateFormData("decisionMaker", e.target.value)
                }
                required
              >
                <option value="">Chọn...</option>
                <option value="yes">Có, tôi là người quyết định</option>
                <option value="influence">
                  Tôi có ảnh hưởng đến quyết định
                </option>
                <option value="no">Không, cần xin phép cấp trên</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Mức độ cấp thiết của dự án?</label>
              <select
                value={formData.urgency}
                onChange={(e) => updateFormData("urgency", e.target.value)}
                required
              >
                <option value="">Chọn...</option>
                <option value="immediate">
                  Rất cấp thiết (cần trong tháng)
                </option>
                <option value="month">Khá cấp thiết (1-2 tháng)</option>
                <option value="quarter">Bình thường (3-6 tháng)</option>
                <option value="research">Chỉ tìm hiểu sơ bộ</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Quy mô team hiện tại</label>
              <select
                value={formData.teamSize}
                onChange={(e) => updateFormData("teamSize", e.target.value)}
              >
                <option value="">Chọn...</option>
                <option value="individual">Cá nhân</option>
                <option value="small">Team nhỏ (2-10 người)</option>
                <option value="medium">Team vừa (10-50 người)</option>
                <option value="large">Công ty lớn (50+ người)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Giải pháp hiện tại bạn đang dùng?</label>
              <input
                type="text"
                placeholder="VD: WordPress, Shopify, tự develop..."
                value={formData.currentSolution}
                onChange={(e) =>
                  updateFormData("currentSolution", e.target.value)
                }
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <h3>Yêu cầu chi tiết</h3>

            <div className={styles.formGroup}>
              <label>Tính năng cần thiết (chọn nhiều):</label>
              <div className={styles.checkboxGroup}>
                {[
                  "Responsive Design",
                  "SEO Optimization",
                  "Admin Dashboard",
                  "User Authentication",
                  "Payment Integration",
                  "API Integration",
                  "Real-time Features",
                  "Analytics & Reporting",
                  "Multi-language",
                  "Cloud Hosting Setup",
                ].map((req) => (
                  <label key={req} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={formData.specificRequirements.includes(req)}
                      onChange={() => toggleRequirement(req)}
                    />
                    {req}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <textarea
                placeholder="Mô tả chi tiết dự án, yêu cầu đặc biệt..."
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Lead Score Display */}
            <div className={styles.leadScore}>
              <div
                className={`${styles.scoreIndicator} ${
                  styles[formData.leadQuality]
                }`}
              >
                <span className={styles.scoreNumber}>{leadScore}</span>
                <span className={styles.scoreLabel}>
                  {formData.leadQuality === "hot"
                    ? "🔥 Ưu tiên cao"
                    : formData.leadQuality === "warm"
                    ? "⭐ Tiềm năng tốt"
                    : "📋 Cần tìm hiểu thêm"}
                </span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles.successStep}>
            <div className={styles.successIcon}>✅</div>
            <h3>Cảm ơn bạn đã liên hệ!</h3>
            <p>
              {formData.leadQuality === "hot"
                ? "Dự án của bạn rất phù hợp! Chúng tôi sẽ liên hệ trong 2h tới."
                : formData.leadQuality === "warm"
                ? "Chúng tôi sẽ liên hệ với bạn trong 24h để trao đổi chi tiết."
                : "Cảm ơn thông tin! Chúng tôi sẽ nghiên cứu và phản hồi sớm nhất."}
            </p>
            <div className={styles.nextSteps}>
              <h4>Bước tiếp theo:</h4>
              <ul>
                <li>📞 Cuộc gọi tư vấn miễn phí (15-30 phút)</li>
                <li>📋 Báo giá chi tiết và timeline</li>
                <li>🤝 Ký hợp đồng và khởi động dự án</li>
              </ul>
              {formData.leadQuality === "hot" && (
                <button
                  className={styles.bookingButton}
                  onClick={() =>
                    window.open(
                      "https://calendly.com/locdo-tech/consultation",
                      "_blank"
                    )
                  }
                >
                  📅 Đặt lịch tư vấn ngay
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 5) {
    return <div className={styles.contactForm}>{renderStep()}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
        <div className={styles.progressSteps}>
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${
                currentStep >= step ? styles.completed : ""
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Lead Score Indicator (visible from step 2) */}
      {currentStep > 1 && leadScore > 0 && (
        <div className={styles.miniScoreDisplay}>
          Lead Score:{" "}
          <span className={styles[formData.leadQuality]}>{leadScore}/100</span>
        </div>
      )}

      {renderStep()}

      {/* Navigation Buttons */}
      <div className={styles.formNavigation}>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className={styles.prevButton}
          >
            ← Quay lại
          </button>
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className={styles.nextButton}
            disabled={
              (currentStep === 1 &&
                (!formData.name || !formData.email || !formData.phone)) ||
              (currentStep === 2 &&
                (!formData.projectType ||
                  !formData.budget ||
                  !formData.timeline)) ||
              (currentStep === 3 &&
                (!formData.decisionMaker || !formData.urgency))
            }
          >
            Tiếp tục →
          </button>
        ) : (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !formData.message}
          >
            {isSubmitting ? "Đang gửi..." : "🚀 Gửi yêu cầu báo giá"}
          </button>
        )}
      </div>
    </form>
  );
}
