"use client";
import { forwardRef, useState } from "react";
import ContactForm from "../ContactForm";
import LeadDashboard from "../LeadDashboard";
import styles from "../../app/Home.module.css";
import { APP_CONFIG } from "../../constants/app";

interface ContactSectionProps {
  t: (key: string) => string;
}

const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ t }, ref) => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleSecretAccess = () => {
      setClickCount((prev) => prev + 1);
      if (clickCount >= 4) {
        // 5 clicks total
        setShowDashboard(true);
        setClickCount(0);
      }
      // Reset counter after 3 seconds
      setTimeout(() => setClickCount(0), 3000);
    };

    return (
      <section
        className={`${styles.contactSection} contact-section`}
        id={APP_CONFIG.SECTIONS.CONTACT}
        ref={ref}
      >
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <h2
              className={styles.sectionTitle}
              onClick={handleSecretAccess}
              style={{ cursor: clickCount > 0 ? "pointer" : "default" }}
            >
              {t("sections.contact")}
              {clickCount > 0 && (
                <span style={{ opacity: 0.3 }}> ({clickCount}/5)</span>
              )}
            </h2>
            <p className={styles.sectionSubtitle}>{t("contact.subtitle")}</p>

            {/* Enhanced Contact Form */}
            <ContactForm t={t} />

            <div className={styles.contactDivider}>
              <span>Hoặc liên hệ trực tiếp</span>
            </div>

            <div className={styles.contactInfo}>
              <div className={`${styles.contactItem} contactItem`}>
                <span className={styles.contactIcon}>
                  {APP_CONFIG.UI.ICONS.EMAIL}
                </span>
                <span className={styles.contactText}>{t("contact.email")}</span>
              </div>
              <div className={`${styles.contactItem} contactItem`}>
                <span className={styles.contactIcon}>
                  {APP_CONFIG.UI.ICONS.PHONE}
                </span>
                <span className={styles.contactText}>{t("contact.phone")}</span>
              </div>
              <div className={`${styles.contactItem} contactItem`}>
                <span className={styles.contactIcon}>
                  {APP_CONFIG.UI.ICONS.LOCATION}
                </span>
                <span className={styles.contactText}>
                  {APP_CONFIG.COMPANY.LOCATION}
                </span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a
                href={APP_CONFIG.SOCIAL_LINKS.LINKEDIN}
                className={`${styles.socialLink} social-link`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{APP_CONFIG.UI.ICONS.LINKEDIN}</span>
                LinkedIn
              </a>
              <a
                href={APP_CONFIG.SOCIAL_LINKS.GITHUB}
                className={`${styles.socialLink} social-link`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{APP_CONFIG.UI.ICONS.GITHUB}</span>
                GitHub
              </a>
              <a
                href={`mailto:${APP_CONFIG.COMPANY.EMAIL}`}
                className={`${styles.socialLink} social-link`}
              >
                <span>{APP_CONFIG.UI.ICONS.EMAIL}</span>
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Secret Lead Dashboard */}
        <LeadDashboard
          isVisible={showDashboard}
          onClose={() => setShowDashboard(false)}
        />
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";

export default ContactSection;
