"use client";
import styles from "../../app/Home.module.css";

export default function BackgroundShapes() {
  return (
    <div className={styles.bgShapes}>
      {/* Primary Electric Orb */}
      <div className={`${styles.bgShape} bgShape`} />

      {/* Secondary Purple Orb */}
      <div className={`${styles.bgShape} bgShape`} />

      {/* Tertiary Emerald Orb */}
      <div className={`${styles.bgShape} bgShape`} />

      {/* Additional Ambient Particles */}
      <div
        className={`${styles.bgShape} bgShape`}
        style={{
          width: "150px",
          height: "150px",
          top: "70%",
          right: "20%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />

      <div
        className={`${styles.bgShape} bgShape`}
        style={{
          width: "200px",
          height: "200px",
          top: "20%",
          left: "10%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
