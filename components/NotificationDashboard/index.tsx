"use client";
import { useState, useEffect } from "react";
import styles from "./NotificationDashboard.module.css";

interface NotificationChannel {
  name: string;
  type: "email" | "discord" | "telegram" | "webhook" | "slack" | "sms";
  enabled: boolean;
  status: "connected" | "error" | "unconfigured";
  lastTest?: Date;
  errorMessage?: string;
  testResult?: any;
}

export default function NotificationDashboard() {
  const [channels, setChannels] = useState<NotificationChannel[]>([]);
  const [testing, setTesting] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  useEffect(() => {
    checkChannelStatus();
  }, []);

  const checkChannelStatus = async () => {
    // Check each notification channel configuration
    const channelStatus: NotificationChannel[] = [
      {
        name: "Email (Resend)",
        type: "email",
        enabled: !!process.env.NEXT_PUBLIC_RESEND_API_KEY,
        status: process.env.NEXT_PUBLIC_RESEND_API_KEY
          ? "connected"
          : "unconfigured",
      },
      {
        name: "Discord Webhook",
        type: "discord",
        enabled: !!process.env.NEXT_PUBLIC_DISCORD_WEBHOOK,
        status: process.env.NEXT_PUBLIC_DISCORD_WEBHOOK?.includes("discord.com")
          ? "connected"
          : "unconfigured",
      },
      {
        name: "Telegram Bot",
        type: "telegram",
        enabled: !!(
          process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN &&
          process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
        ),
        status: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
          ? "connected"
          : "unconfigured",
      },
      {
        name: "Custom Webhook",
        type: "webhook",
        enabled: !!process.env.NEXT_PUBLIC_WEBHOOK_URL,
        status: process.env.NEXT_PUBLIC_WEBHOOK_URL
          ? "connected"
          : "unconfigured",
      },
      {
        name: "Slack Webhook",
        type: "slack",
        enabled: !!process.env.NEXT_PUBLIC_SLACK_WEBHOOK,
        status: process.env.NEXT_PUBLIC_SLACK_WEBHOOK
          ? "connected"
          : "unconfigured",
      },
      {
        name: "Browser Notifications",
        type: "sms", // reusing type
        enabled: "Notification" in window,
        status:
          "Notification" in window
            ? Notification.permission === "granted"
              ? "connected"
              : Notification.permission === "denied"
              ? "error"
              : "unconfigured"
            : "error",
      },
    ];

    setChannels(channelStatus);
  };

  const testNotification = async (channel: NotificationChannel) => {
    setTesting(channel.name);

    const testLead = {
      id: `test-${Date.now()}`,
      name: "Test Lead",
      email: "test@locdo.tech",
      phone: "+84968343185",
      company: "LocDo Tech",
      projectType: "Website Development",
      budget: "$5,000 - $10,000",
      timeline: "1-2 months",
      urgency: "High",
      decisionMaker: "Yes",
      message:
        "This is a test notification from the LocDo Tech notification system.",
      leadScore: 85,
      leadQuality: "hot" as const,
      timestamp: new Date().toISOString(),
      source: "notification_test",
      userAgent: navigator.userAgent,
      referrer: window.location.href,
    };

    try {
      let result: Response | { ok: boolean; status: number } | undefined;

      switch (channel.type) {
        case "email":
          result = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: ["locdx@locdo.tech"],
              subject: "🧪 Test Email Notification - LocDo Tech",
              html: `<h1>✅ Email notifications are working!</h1><p>Test timestamp: ${new Date()}</p>`,
              priority: "NORMAL",
              lead_id: testLead.id,
            }),
          });
          break;

        case "discord":
          if (process.env.NEXT_PUBLIC_DISCORD_WEBHOOK) {
            result = await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                content: "🧪 **Test Discord Notification**",
                embeds: [
                  {
                    title: "✅ Discord notifications are working!",
                    description: `Test timestamp: ${new Date().toLocaleString()}`,
                    color: 0x00ff00,
                    footer: { text: "LocDo Tech Notification System" },
                  },
                ],
              }),
            });
          }
          break;

        case "telegram":
          if (
            process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN &&
            process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
          ) {
            result = await fetch(
              `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
                  text: `🧪 *Test Telegram Notification*\n\n✅ Telegram notifications are working!\n\nTest timestamp: ${new Date().toLocaleString(
                    "vi-VN"
                  )}`,
                  parse_mode: "Markdown",
                }),
              }
            );
          }
          break;

        case "webhook":
          if (process.env.NEXT_PUBLIC_WEBHOOK_URL) {
            result = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: "test_notification",
                timestamp: new Date().toISOString(),
                test_lead: testLead,
                message: "✅ Webhook notifications are working!",
              }),
            });
          }
          break;

        case "slack":
          if (process.env.NEXT_PUBLIC_SLACK_WEBHOOK) {
            result = await fetch(process.env.NEXT_PUBLIC_SLACK_WEBHOOK, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: "🧪 Test Slack Notification",
                attachments: [
                  {
                    color: "good",
                    title: "✅ Slack notifications are working!",
                    fields: [
                      {
                        title: "Test Time",
                        value: new Date().toLocaleString(),
                        short: true,
                      },
                      { title: "System", value: "LocDo Tech", short: true },
                    ],
                  },
                ],
              }),
            });
          }
          break;

        case "sms":
          // Test browser notification
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("🧪 Test Browser Notification", {
              body: "✅ Browser notifications are working!",
              icon: "/favicon.ico",
              tag: "test-notification",
            });
            result = { ok: true, status: 200 };
          } else {
            throw new Error("Browser notifications not granted");
          }
          break;
      }

      if (!result) {
        throw new Error("No result from notification test");
      }

      const responseData =
        result.ok && "json" in result
          ? await result.json()
          : { error: "Request failed" };

      setTestResults((prev) => ({
        ...prev,
        [channel.name]: {
          success: result.ok || false,
          data: responseData,
          timestamp: new Date(),
        },
      }));

      // Update channel status
      setChannels((prev) =>
        prev.map((ch) =>
          ch.name === channel.name
            ? {
                ...ch,
                status: result?.ok ? "connected" : "error",
                lastTest: new Date(),
              }
            : ch
        )
      );
    } catch (error) {
      console.error(`Test failed for ${channel.name}:`, error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      setTestResults((prev) => ({
        ...prev,
        [channel.name]: {
          success: false,
          error: errorMessage,
          timestamp: new Date(),
        },
      }));

      setChannels((prev) =>
        prev.map((ch) =>
          ch.name === channel.name
            ? { ...ch, status: "error", errorMessage, lastTest: new Date() }
            : ch
        )
      );
    }

    setTesting(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return "✅";
      case "error":
        return "❌";
      case "unconfigured":
        return "⚙️";
      default:
        return "❓";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "unconfigured":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className={styles.dashboard}>
      <h2>🔔 Notification System Dashboard</h2>

      <div className={styles.summary}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>
            {channels.filter((ch) => ch.status === "connected").length}
          </span>
          <span className={styles.statLabel}>Connected</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>
            {channels.filter((ch) => ch.enabled).length}
          </span>
          <span className={styles.statLabel}>Enabled</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{channels.length}</span>
          <span className={styles.statLabel}>Total Channels</span>
        </div>
      </div>

      <div className={styles.channels}>
        {channels.map((channel) => (
          <div key={channel.name} className={styles.channel}>
            <div className={styles.channelHeader}>
              <span className={styles.channelIcon}>
                {getStatusIcon(channel.status)}
              </span>
              <div className={styles.channelInfo}>
                <h3>{channel.name}</h3>
                <span
                  className={styles.status}
                  style={{ color: getStatusColor(channel.status) }}
                >
                  {channel.status}
                  {channel.lastTest && (
                    <small>
                      {" "}
                      • Last tested: {channel.lastTest.toLocaleTimeString()}
                    </small>
                  )}
                </span>
              </div>
              <button
                onClick={() => testNotification(channel)}
                disabled={testing === channel.name || !channel.enabled}
                className={styles.testButton}
              >
                {testing === channel.name ? "Testing..." : "Test"}
              </button>
            </div>

            {channel.errorMessage && (
              <div className={styles.error}>❌ {channel.errorMessage}</div>
            )}

            {testResults[channel.name] && (
              <div
                className={`${styles.testResult} ${
                  testResults[channel.name].success
                    ? styles.success
                    : styles.error
                }`}
              >
                <strong>Test Result:</strong>
                {testResults[channel.name].success ? (
                  <span>✅ Success</span>
                ) : (
                  <span>❌ {testResults[channel.name].error}</span>
                )}
                <small>
                  at {testResults[channel.name].timestamp.toLocaleTimeString()}
                </small>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.instructions}>
        <h3>📋 Setup Instructions</h3>
        <ol>
          <li>
            <strong>Email (Resend):</strong> Sign up at resend.com, get API key,
            add to .env.local
          </li>
          <li>
            <strong>Discord:</strong> Create webhook in Discord server settings
          </li>
          <li>
            <strong>Telegram:</strong> Message @BotFather to create bot, get
            token and chat ID
          </li>
          <li>
            <strong>Browser:</strong> Allow notifications when prompted
          </li>
          <li>
            <strong>Custom Webhook:</strong> Set up your backend endpoint
          </li>
        </ol>

        <p>
          Copy <code>.env.example</code> to <code>.env.local</code> and fill in
          your credentials.
        </p>
      </div>
    </div>
  );
}
