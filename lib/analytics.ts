// Business tracking utilities
export const trackBusinessEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  (window as any).gtag?.("event", eventName, {
    page_title: document.title,
    page_location: window.location.href,
    ...parameters,
  });

  // Facebook Pixel
  (window as any).fbq?.("track", eventName, parameters);

  // Custom analytics
  console.log(`Business Event: ${eventName}`, parameters);
};

export const trackLeadGeneration = (
  source: string,
  projectType?: string,
  budget?: string
) => {
  trackBusinessEvent("generate_lead", {
    lead_source: source,
    project_type: projectType,
    budget_range: budget,
    value: budget === "over-50m" ? 50 : budget === "30-50m" ? 30 : 10,
    currency: "VND",
  });
};

export const trackServiceInterest = (service: string) => {
  trackBusinessEvent("view_item", {
    item_category: "service",
    item_name: service,
  });
};

export const trackContactAttempt = (method: "form" | "phone" | "email") => {
  trackBusinessEvent("contact", {
    method,
    contact_method: method,
  });
};
