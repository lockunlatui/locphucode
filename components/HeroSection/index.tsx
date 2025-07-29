"use client";
import { forwardRef } from "react";
import styles from "../../app/Home.module.css";
import { APP_CONFIG } from "../../constants/app";
import { UI } from "../../constants/ui";

interface HeroSectionProps {
  t: (key: string) => string;
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ t }, ref) => {
    return (
      <section className={styles.heroSection} ref={ref}>
        <div className={styles.heroContent}>
          <div className="hero-text">
            <h1 className={`${styles.heroTitle} hero-title`}>
              Welcome to{" "}
              <span className={`${styles.gradientText} gradientText`}>
                {t("company.name")}
              </span>
            </h1>
            <p className={`${styles.heroSubtitle} hero-subtitle`}>
              {t("company.tagline")}
            </p>
            <p className={`${styles.heroDescription} hero-description`}>
              {t("company.description")}
            </p>
            <div className={`${styles.heroButtons} hero-buttons`}>
              <a
                href={APP_CONFIG.NAVIGATION.CONTACT}
                className={`${styles.btn} ${styles.btnPrimary} btn`}
              >
                <span className={styles.btnIcon}>
                  {APP_CONFIG.UI.ICONS.CONTACT}
                </span>
                {t("company.cta.contact")}
              </a>
              <a
                href={APP_CONFIG.NAVIGATION.SERVICES}
                className={`${styles.btn} ${styles.btnSecondary} btn`}
              >
                <span className={styles.btnIcon}>
                  {APP_CONFIG.UI.ICONS.SERVICES}
                </span>
                {t("company.cta.courses")}
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={`${styles.heroImage} hero-image`}>
              <div className={styles.codeAnimation}>
                <div className={`${styles.codeLine} code-line`}></div>
                <div className={`${styles.codeLine} code-line`}></div>
                <div className={`${styles.codeLine} code-line`}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
