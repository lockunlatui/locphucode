"use client";
import { forwardRef } from "react";
import styles from "../../app/Home.module.css";
import { APP_CONFIG } from "../../constants/app";

interface ContactSectionProps {
  t: (key: string) => string;
}

const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ t }, ref) => {
    return (
      <section
        className={`${styles.contactSection} contact-section`}
        id={APP_CONFIG.SECTIONS.CONTACT}
        ref={ref}
      >
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <h2 className={styles.sectionTitle}>{t("sections.contact")}</h2>
            <p className={styles.sectionSubtitle}>{t("contact.subtitle")}</p>

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
      </section>
    );
  }
);

ContactSection.displayName = "ContactSection";

export default ContactSection;
