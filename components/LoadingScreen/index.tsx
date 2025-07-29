"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "../../app/Home.module.css";

interface LoadingScreenProps {}

export default function LoadingScreen({}: LoadingScreenProps) {
  useEffect(() => {
    // Advanced loading animation
    const tl = gsap.timeline({ repeat: -1 });

    // Morphing loader
    tl.fromTo(
      ".loader-morph",
      {
        scale: 1,
        rotation: 0,
        borderRadius: "50%",
      },
      {
        scale: 1.5,
        rotation: 180,
        borderRadius: "20%",
        duration: 1,
        ease: "power2.inOut",
      }
    ).to(".loader-morph", {
      scale: 1,
      rotation: 360,
      borderRadius: "50%",
      duration: 1,
      ease: "power2.inOut",
    });

    // Text animation
    gsap.fromTo(
      ".loading-text",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      }
    );

    // Particle system
    gsap.utils.toArray(".particle").forEach((particle: any, i) => {
      gsap.to(particle, {
        y: "random(-100, 100)",
        x: "random(-100, 100)",
        scale: "random(0.5, 1.5)",
        rotation: "random(0, 360)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={`${styles.loadingContainer} loading-container`}>
      <div className={styles.loadingSpinner}>
        <div className={`${styles.loaderMorph} loader-morph`}>
          <div
            className="particle"
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: "var(--electric)",
              borderRadius: "50%",
              top: "10%",
              left: "10%",
            }}
          />
          <div
            className="particle"
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              background: "var(--purple)",
              borderRadius: "50%",
              top: "80%",
              right: "20%",
            }}
          />
          <div
            className="particle"
            style={{
              position: "absolute",
              width: "3px",
              height: "3px",
              background: "var(--emerald)",
              borderRadius: "50%",
              bottom: "30%",
              left: "70%",
            }}
          />
        </div>
        <p className="loading-text">Initializing Experience...</p>
      </div>
    </div>
  );
}
