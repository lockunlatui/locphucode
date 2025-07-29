"use client";
import { forwardRef } from "react";
import styles from "../../app/Home.module.css";
import { APP_CONFIG } from "../../constants/app";

interface AboutSectionProps {
  t: (key: string) => string;
}

const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ t }, ref) => {
    return (
      <section className={`${styles.aboutSection} about-section`} ref={ref}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className="about-text">
              <h2 className={styles.sectionTitle}>{t("sections.about")}</h2>
              <p className={`${styles.aboutDescription} aboutDescription`}>
                {t("about.description")}
              </p>
              <div className="about-features">
                <div className={`${styles.featureItem} feature-item`}>
                  <span className={styles.featureIcon}>
                    {APP_CONFIG.UI.ICONS.FAST}
                  </span>
                  <span>{t("features.fast")}</span>
                </div>
                <div className={`${styles.featureItem} feature-item`}>
                  <span className={styles.featureIcon}>
                    {APP_CONFIG.UI.ICONS.PRECISE}
                  </span>
                  <span>{t("features.precise")}</span>
                </div>
                <div className={`${styles.featureItem} feature-item`}>
                  <span className={styles.featureIcon}>
                    {APP_CONFIG.UI.ICONS.SECURE}
                  </span>
                  <span>{t("features.secure")}</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className={styles.techStack}>
                {APP_CONFIG.TECH_STACK.map((tech, index) => (
                  <div key={index} className={`${styles.techItem} tech-item`}>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

AboutSection.displayName = "AboutSection";

export default AboutSection;
