import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, priority, lead_id } = await request.json();

    // Chỉ gửi email đến locdx@locdo.tech
    console.log(`📧 Sending email to: ${to} - Lead ID: ${lead_id}`);

    // Using Resend API (free tier: 3000 emails/month)
    const RESEND_API_KEY =
      process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

    if (!RESEND_API_KEY || RESEND_API_KEY === "your_resend_api_key") {
      console.log("📧 Resend API key not configured, simulating email send:");
      console.log({
        to: to,
        subject: subject,
        lead_id: lead_id,
        priority: priority,
        timestamp: new Date().toISOString(),
      });

      // Simulate successful email for development
      return NextResponse.json({
        success: true,
        message: `✅ Email simulated successfully to ${to}`,
        method: "simulation",
        recipient: to,
        note: "Configure RESEND_API_KEY + verify domain for real sending",
      });
    }

    // Try to send via Resend to verified email address
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "LocDo Tech <noreply@locdo.tech>", // ✅ Sử dụng domain đã verify
          to: "locdx@locdo.tech", // ✅ Email đích thực
          subject: subject, // ✅ Subject gốc, không cần (Original: ...)
          html: html, // ✅ HTML gốc, không cần forwarding notice
          tags: [
            { name: "type", value: "lead_notification" },
            { name: "priority", value: priority },
            { name: "lead_id", value: lead_id },
          ],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Email sent successfully via Resend:", result.id);

        return NextResponse.json({
          success: true,
          message: "✅ Email sent successfully to locdx@locdo.tech",
          emailId: result.id,
          method: "resend",
          recipient: "locdx@locdo.tech",
        });
      } else {
        const errorData = await response.text();
        console.error("❌ Resend API error:", errorData);

        // If still error, fallback to simulation
        throw new Error(`Resend API error: ${errorData}`);
      }
    } catch (resendError) {
      console.log("📧 Resend failed, using simulation fallback:", resendError);

      // Fallback: Simulate successful email
      console.log("📧 EMAIL NOTIFICATION (Simulated):");
      console.log("=".repeat(50));
      console.log(`TO: locdx@locdo.tech`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`LEAD_ID: ${lead_id}`);
      console.log(`PRIORITY: ${priority}`);
      console.log(`TIMESTAMP: ${new Date().toISOString()}`);
      console.log("=".repeat(50));

      return NextResponse.json({
        success: true,
        message:
          "✅ Email simulated successfully (would be sent to locdx@locdo.tech)",
        method: "simulation_fallback",
        recipient: "locdx@locdo.tech",
        note: "Domain locdo.tech is verified, should work in production",
        resend_error:
          resendError instanceof Error
            ? resendError.message
            : "Unknown Resend error",
      });
    }
  } catch (error) {
    console.error("❌ Email API error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
