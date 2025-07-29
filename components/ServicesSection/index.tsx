"use client";
import { forwardRef } from "react";
import styles from "../../app/Home.module.css";
import { APP_CONFIG } from "../../constants/app";

interface ServicesSectionProps {
  t: (key: string) => string;
}

const ServicesSection = forwardRef<HTMLDivElement, ServicesSectionProps>(
  ({ t }, ref) => {
    return (
      <section
        className={`${styles.servicesSection} services-section`}
        id={APP_CONFIG.SECTIONS.SERVICES}
        ref={ref}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("sections.services")}</h2>
            <p className={styles.sectionSubtitle}>{t("services.subtitle")}</p>
          </div>
          <div className={styles.servicesGrid}>
            <div className={`${styles.serviceCard} service-card`}>
              <span className={`${styles.serviceIcon} serviceIcon`}>
                {APP_CONFIG.UI.ICONS.WEB}
              </span>
              <h3 className={styles.serviceTitle}>{t("services.web.title")}</h3>
              <p className={styles.serviceDesc}>
                {t("services.web.description")}
              </p>
            </div>
            <div className={`${styles.serviceCard} service-card`}>
              <span className={`${styles.serviceIcon} serviceIcon`}>
                {APP_CONFIG.UI.ICONS.MOBILE}
              </span>
              <h3 className={styles.serviceTitle}>
                {t("services.mobile.title")}
              </h3>
              <p className={styles.serviceDesc}>
                {t("services.mobile.description")}
              </p>
            </div>
            <div className={`${styles.serviceCard} service-card`}>
              <span className={`${styles.serviceIcon} serviceIcon`}>
                {APP_CONFIG.UI.ICONS.PYTHON}
              </span>
              <h3 className={styles.serviceTitle}>
                {t("services.python.title")}
              </h3>
              <p className={styles.serviceDesc}>
                {t("services.python.description")}
              </p>
            </div>
            <div className={`${styles.serviceCard} service-card`}>
              <span className={`${styles.serviceIcon} serviceIcon`}>
                {APP_CONFIG.UI.ICONS.EDUCATION}
              </span>
              <h3 className={styles.serviceTitle}>
                {t("services.education.title")}
              </h3>
              <p className={styles.serviceDesc}>
                {t("services.education.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ServicesSection.displayName = "ServicesSection";

export default ServicesSection;
