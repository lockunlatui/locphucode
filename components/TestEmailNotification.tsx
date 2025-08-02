// Test email notification đơn giản
"use client";
import { useState } from "react";

export default function TestEmailNotification() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testEmail = async () => {
    setSending(true);
    setResult(null);

    try {
      const testLead = {
        id: `test-${Date.now()}`,
        name: "Nguyễn Văn Test",
        email: "test@example.com",
        phone: "+84968343185",
        company: "Test Company",
        projectType: "Website Development",
        budget: "$5,000 - $10,000",
        timeline: "1-2 months",
        urgency: "High",
        decisionMaker: "Yes",
        currentSolution: "None",
        teamSize: "5-10 people",
        technicalExpertise: "Basic",
        message:
          "Chúng tôi cần tư vấn về phát triển website ecommerce. Dự án cần hoàn thành trong 2 tháng tới.",
        specificRequirements: [
          "Ecommerce",
          "Mobile responsive",
          "SEO optimized",
        ],
        leadScore: 85,
        leadQuality: "hot" as const,
        timestamp: new Date().toISOString(),
        source: "contact_form",
        userAgent: navigator.userAgent,
        referrer: window.location.href,
      };

      // Import simple notification
      const { sendEmailNotification } = await import(
        "../lib/notifications-simple"
      );

      const emailResult = await sendEmailNotification(testLead);

      setResult({
        success: emailResult.success,
        message: emailResult.success
          ? "✅ Email sent to locdx@locdo.tech!"
          : "❌ Email failed",
        details: emailResult,
      });
    } catch (error) {
      setResult({
        success: false,
        message: "❌ Test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }

    setSending(false);
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        margin: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "600px",
      }}
    >
      <h3>🧪 Test Email Notification</h3>
      <p>
        Gửi email test đến <strong>locdx@locdo.tech</strong>
      </p>

      <button
        onClick={testEmail}
        disabled={sending}
        style={{
          background: sending ? "#9ca3af" : "#3b82f6",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: sending ? "not-allowed" : "pointer",
          transition: "background-color 0.2s",
        }}
      >
        {sending ? "Đang gửi..." : "📧 Gửi Test Email"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            borderRadius: "8px",
            background: result.success ? "#d1fae5" : "#fee2e2",
            border: `1px solid ${result.success ? "#10b981" : "#ef4444"}`,
            color: result.success ? "#065f46" : "#dc2626",
          }}
        >
          <h4>{result.message}</h4>
          <pre
            style={{
              fontSize: "12px",
              background: "rgba(0,0,0,0.1)",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(result.details, null, 2)}
          </pre>
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          background: "#f8fafc",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#64748b",
        }}
      >
        <h4>📋 Test sẽ tạo:</h4>
        <ul>
          <li>✅ Hot lead (score: 85/100)</li>
          <li>📧 Email HTML đầy đủ thông tin</li>
          <li>🎯 Priority: HIGH (vì là hot lead)</li>
          <li>📱 Browser notification backup</li>
        </ul>
      </div>
    </div>
  );
}
