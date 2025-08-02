// Error Boundary for better UX
"use client";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to analytics service
    console.error("Application error:", error, errorInfo);

    // Send to monitoring service (Sentry, LogRocket, etc.)
    if (typeof window !== "undefined") {
      // Track error for business insights
      (window as any).gtag?.("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2>🚧 Đã có lỗi xảy ra</h2>
          <p>Chúng tôi đang khắc phục sự cố. Vui lòng thử lại sau.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "1rem auto",
            }}
          >
            Tải lại trang
          </button>
          <a href="tel:+84999xxx999">📞 Hoặc liên hệ trực tiếp</a>
        </div>
      );
    }

    return this.props.children;
  }
}
