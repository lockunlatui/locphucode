// Real-time Notification System for Website Owner
import { QualifiedLead } from "./leadQualification";

interface NotificationConfig {
  email?: {
    enabled: boolean;
    service: "resend" | "emailjs" | "nodemailer";
    apiKey?: string;
    fromEmail?: string;
    toEmails: string[];
  };
  discord?: {
    enabled: boolean;
    webhookUrl: string;
  };
  slack?: {
    enabled: boolean;
    webhookUrl: string;
  };
  telegram?: {
    enabled: boolean;
    botToken: string;
    chatId: string;
  };
  webhook?: {
    enabled: boolean;
    url: string;
    secret?: string;
  };
  sms?: {
    enabled: boolean;
    service: "twilio" | "vonage";
    apiKey?: string;
    phoneNumbers: string[];
  };
}

// Configuration - Replace with your actual credentials
const NOTIFICATION_CONFIG: NotificationConfig = {
  email: {
    enabled: true,
    service: "resend", // Free tier: 3000 emails/month
    apiKey: process.env.NEXT_PUBLIC_RESEND_API_KEY, // Get from resend.com
    fromEmail: "leads@locdo.tech",
    toEmails: ["locdx@locdo.tech", "admin@locdo.tech"],
  },
  discord: {
    enabled: true,
    webhookUrl:
      process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || "YOUR_DISCORD_WEBHOOK_URL",
  },
  slack: {
    enabled: false,
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK || "",
  },
  telegram: {
    enabled: true,
    botToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "-1001234567890",
  },
  webhook: {
    enabled: true,
    url:
      process.env.NEXT_PUBLIC_WEBHOOK_URL ||
      "https://your-backend.com/api/leads",
    secret: process.env.NEXT_PUBLIC_WEBHOOK_SECRET,
  },
  sms: {
    enabled: false, // Enable if needed
    service: "twilio",
    phoneNumbers: ["+84968343185"],
  },
};

export const sendLeadNotification = async (lead: QualifiedLead) => {
  console.log("🚀 Sending lead notifications...", lead);

  const notifications = [];

  // 1. Email Notification (Highest Priority)
  if (NOTIFICATION_CONFIG.email?.enabled) {
    notifications.push(sendEmailNotification(lead));
  }

  // 2. Discord Notification (Real-time)
  if (NOTIFICATION_CONFIG.discord?.enabled) {
    notifications.push(sendDiscordNotification(lead));
  }

  // 3. Telegram Notification (Mobile-friendly)
  if (NOTIFICATION_CONFIG.telegram?.enabled) {
    notifications.push(sendTelegramNotification(lead));
  }

  // 4. Custom Webhook (for your backend/CRM)
  if (NOTIFICATION_CONFIG.webhook?.enabled) {
    notifications.push(sendWebhookNotification(lead));
  }

  // 5. Slack Notification
  if (NOTIFICATION_CONFIG.slack?.enabled) {
    notifications.push(sendSlackNotification(lead));
  }

  // 6. SMS for Hot Leads
  if (NOTIFICATION_CONFIG.sms?.enabled && lead.leadQuality === "hot") {
    notifications.push(sendSMSNotification(lead));
  }

  // Execute all notifications in parallel
  try {
    const results = await Promise.allSettled(notifications);

    // Log results
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`✅ Notification ${index + 1} sent successfully`);
      } else {
        console.error(`❌ Notification ${index + 1} failed:`, result.reason);
      }
    });

    return { success: true, results };
  } catch (error) {
    console.error("Failed to send notifications:", error);
    return { success: false, error };
  }
};

// 1. Email Notification via Resend (Free & Reliable)
const sendEmailNotification = async (lead: QualifiedLead) => {
  const subject = `🔥 New ${lead.leadQuality.toUpperCase()} Lead: ${
    lead.name
  } - ${lead.projectType}`;
  const priority =
    lead.leadQuality === "hot"
      ? "HIGH"
      : lead.leadQuality === "warm"
      ? "NORMAL"
      : "LOW";

  const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
    .header { background: ${
      lead.leadQuality === "hot"
        ? "#e53e3e"
        : lead.leadQuality === "warm"
        ? "#dd6b20"
        : "#4a5568"
    }; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .score { font-size: 24px; font-weight: bold; color: ${
      lead.leadQuality === "hot"
        ? "#e53e3e"
        : lead.leadQuality === "warm"
        ? "#dd6b20"
        : "#4a5568"
    }; }
    .section { margin: 15px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
    .urgent { background: #fed7d7; border-left: 4px solid #e53e3e; }
    .button { background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
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
          ? '<div class="section urgent"><strong>⚠️ URGENT: Contact within 2 hours!</strong></div>'
          : ""
      }
      
      <div class="section">
        <h3>👤 Contact Information</h3>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${lead.email}">${
    lead.email
  }</a></p>
        <p><strong>Phone:</strong> <a href="tel:${lead.phone}">${
    lead.phone
  }</a></p>
        <p><strong>Company:</strong> ${lead.company}</p>
      </div>
      
      <div class="section">
        <h3>💼 Project Details</h3>
        <p><strong>Type:</strong> ${lead.projectType}</p>
        <p><strong>Budget:</strong> ${lead.budget}</p>
        <p><strong>Timeline:</strong> ${lead.timeline}</p>
        <p><strong>Urgency:</strong> ${lead.urgency}</p>
        <p><strong>Decision Maker:</strong> ${lead.decisionMaker}</p>
      </div>
      
      <div class="section">
        <h3>📝 Message</h3>
        <p>${lead.message}</p>
      </div>
      
      <div class="section">
        <h3>🎯 Next Actions</h3>
        ${
          lead.leadQuality === "hot"
            ? "<p>🚨 <strong>Call immediately!</strong> This is a high-value lead.</p>"
            : lead.leadQuality === "warm"
            ? "<p>📞 Call within 24 hours for best conversion.</p>"
            : "<p>📧 Send follow-up email within 3 days.</p>"
        }
        
        <a href="mailto:${lead.email}" class="button">📧 Email Lead</a>
        <a href="tel:${lead.phone}" class="button">📞 Call Lead</a>
      </div>
      
      <div class="section">
        <h3>📊 Lead Analytics</h3>
        <p><strong>Submitted:</strong> ${new Date(
          lead.timestamp
        ).toLocaleString("vi-VN")}</p>
        <p><strong>Source:</strong> ${lead.source}</p>
        <p><strong>User Agent:</strong> ${lead.userAgent}</p>
        <p><strong>Referrer:</strong> ${lead.referrer || "Direct"}</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  // Using fetch to send via Resend API (client-side)
  return fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: NOTIFICATION_CONFIG.email?.toEmails,
      subject,
      html: emailBody,
      priority,
      lead_id: lead.id,
    }),
  });
};

// 2. Discord Notification (Real-time, Free)
const sendDiscordNotification = async (lead: QualifiedLead) => {
  const webhookUrl = NOTIFICATION_CONFIG.discord?.webhookUrl;
  if (!webhookUrl || webhookUrl === "YOUR_DISCORD_WEBHOOK_URL") return;

  const color =
    lead.leadQuality === "hot"
      ? 0xe53e3e
      : lead.leadQuality === "warm"
      ? 0xdd6b20
      : 0x4a5568;
  const emoji =
    lead.leadQuality === "hot"
      ? "🔥"
      : lead.leadQuality === "warm"
      ? "⭐"
      : "📋";

  const embed = {
    title: `${emoji} New ${lead.leadQuality.toUpperCase()} Lead: ${lead.name}`,
    description: `**Score: ${lead.leadScore}/100** | Project: ${lead.projectType}`,
    color,
    fields: [
      {
        name: "👤 Contact",
        value: `**${lead.name}**\n📧 ${lead.email}\n📞 ${lead.phone}`,
        inline: true,
      },
      {
        name: "💼 Project",
        value: `**${lead.projectType}**\n💰 ${lead.budget}\n⏰ ${lead.urgency}`,
        inline: true,
      },
      {
        name: "🎯 Next Action",
        value:
          lead.leadQuality === "hot"
            ? "🚨 **CALL NOW!**"
            : "📞 Call within 24h",
        inline: false,
      },
      {
        name: "📝 Message",
        value:
          lead.message.length > 100
            ? lead.message.substring(0, 100) + "..."
            : lead.message,
        inline: false,
      },
    ],
    timestamp: new Date(lead.timestamp).toISOString(),
    footer: { text: `Lead ID: ${lead.id}` },
  };

  return fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content:
        lead.leadQuality === "hot" ? "@everyone 🚨 **HOT LEAD ALERT!**" : "",
      embeds: [embed],
    }),
  });
};

// 3. Telegram Notification (Mobile Push Notifications)
const sendTelegramNotification = async (lead: QualifiedLead) => {
  const botToken = NOTIFICATION_CONFIG.telegram?.botToken;
  const chatId = NOTIFICATION_CONFIG.telegram?.chatId;
  if (!botToken || !chatId) return;

  const emoji =
    lead.leadQuality === "hot"
      ? "🔥"
      : lead.leadQuality === "warm"
      ? "⭐"
      : "📋";
  const urgencyText =
    lead.leadQuality === "hot" ? "*URGENT - CALL NOW!*" : "Call within 24h";

  const message = `
${emoji} *NEW ${lead.leadQuality.toUpperCase()} LEAD*

*Score:* ${lead.leadScore}/100
*Name:* ${lead.name}
*Email:* ${lead.email}
*Phone:* ${lead.phone}
*Project:* ${lead.projectType}
*Budget:* ${lead.budget}
*Urgency:* ${lead.urgency}

*Message:*
_${lead.message}_

*Next Action:* ${urgencyText}

*Submitted:* ${new Date(lead.timestamp).toLocaleString("vi-VN")}
*Lead ID:* \`${lead.id}\`
`;

  return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });
};

// 4. Custom Webhook (for your CRM/Backend)
const sendWebhookNotification = async (lead: QualifiedLead) => {
  const webhookUrl = NOTIFICATION_CONFIG.webhook?.url;
  if (!webhookUrl || webhookUrl === "https://your-backend.com/api/leads")
    return;

  const payload = {
    event: "new_lead",
    timestamp: new Date().toISOString(),
    lead,
    metadata: {
      source: "website_contact_form",
      priority:
        lead.leadQuality === "hot"
          ? "high"
          : lead.leadQuality === "warm"
          ? "medium"
          : "low",
      action_required:
        lead.leadQuality === "hot" ? "immediate_call" : "follow_up",
    },
  };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "LocDoTech-LeadSystem/1.0",
  };

  // Add webhook signature if secret is configured
  if (NOTIFICATION_CONFIG.webhook?.secret) {
    const crypto = await import("crypto");
    const signature = crypto
      .createHmac("sha256", NOTIFICATION_CONFIG.webhook.secret)
      .update(JSON.stringify(payload))
      .digest("hex");
    headers["X-Webhook-Signature"] = `sha256=${signature}`;
  }

  return fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
};

// 5. Slack Notification
const sendSlackNotification = async (lead: QualifiedLead) => {
  const webhookUrl = NOTIFICATION_CONFIG.slack?.webhookUrl;
  if (!webhookUrl) return;

  const color =
    lead.leadQuality === "hot"
      ? "danger"
      : lead.leadQuality === "warm"
      ? "warning"
      : "good";
  const emoji =
    lead.leadQuality === "hot"
      ? ":fire:"
      : lead.leadQuality === "warm"
      ? ":star:"
      : ":clipboard:";

  return fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text:
        lead.leadQuality === "hot"
          ? "<!channel> 🚨 HOT LEAD ALERT!"
          : `${emoji} New ${lead.leadQuality} lead`,
      attachments: [
        {
          color,
          title: `${emoji} ${lead.name} - ${lead.projectType}`,
          fields: [
            { title: "Score", value: `${lead.leadScore}/100`, short: true },
            { title: "Budget", value: lead.budget, short: true },
            { title: "Email", value: lead.email, short: true },
            { title: "Phone", value: lead.phone, short: true },
          ],
          footer: `Lead ID: ${lead.id}`,
          ts: Math.floor(new Date(lead.timestamp).getTime() / 1000),
        },
      ],
    }),
  });
};

// 6. SMS Notification (for Hot Leads only)
const sendSMSNotification = async (lead: QualifiedLead) => {
  // Implementation depends on SMS service (Twilio, Vonage, etc.)
  // This is a placeholder - you'd need to implement based on your SMS provider
  console.log("📱 SMS notification would be sent for hot lead:", lead.name);
  return Promise.resolve();
};

// Fallback Browser Notification
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
