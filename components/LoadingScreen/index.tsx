"use client";
import styles from "../../app/Home.module.css";

interface LoadingScreenProps {}

export default function LoadingScreen({}: LoadingScreenProps) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}
