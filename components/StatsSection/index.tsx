"use client";
import styles from "../../app/Home.module.css";
import { APP_CONFIG } from "../../constants/app";

interface StatsSectionProps {
  t: (key: string) => string;
}

export default function StatsSection({ t }: StatsSectionProps) {
  return (
    <section className={`${styles.statsSection} stats-section`}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={`${styles.statItem} stat-item`}>
            <div className={`${styles.statNumber} statNumber`}>
              {APP_CONFIG.STATS.PROJECTS}
            </div>
            <div className={styles.statLabel}>{t("stats.projects")}</div>
          </div>
          <div className={`${styles.statItem} stat-item`}>
            <div className={`${styles.statNumber} statNumber`}>
              {APP_CONFIG.STATS.STUDENTS}
            </div>
            <div className={styles.statLabel}>{t("stats.students")}</div>
          </div>
          <div className={`${styles.statItem} stat-item`}>
            <div className={`${styles.statNumber} statNumber`}>
              {APP_CONFIG.STATS.SATISFACTION}
            </div>
            <div className={styles.statLabel}>{t("stats.satisfaction")}</div>
          </div>
          <div className={`${styles.statItem} stat-item`}>
            <div className={`${styles.statNumber} statNumber`}>
              {APP_CONFIG.STATS.EXPERIENCE}
            </div>
            <div className={styles.statLabel}>{t("stats.experience")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
