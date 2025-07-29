"use client";
import styles from "../../app/Home.module.css";

interface BackgroundShapesProps {}

export default function BackgroundShapes({}: BackgroundShapesProps) {
  return (
    <div className={styles.bgShapes}>
      <div className={`${styles.bgShape} shape-1`}></div>
      <div className={`${styles.bgShape} shape-2`}></div>
      <div className={`${styles.bgShape} shape-3`}></div>
    </div>
  );
}
