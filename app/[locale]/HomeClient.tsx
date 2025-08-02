"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/lib/i18n";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundShapes from "@/components/BackgroundShapes";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import TestEmailNotification from "@/components/TestEmailNotification";
import styles from "../Home.module.css";

interface HomePageClientProps {
  locale: string;
}

export default function HomePageClient({ locale }: HomePageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showTest, setShowTest] = useState(false);
  const { t } = useTranslation(locale);

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP animations
  useGSAPAnimations(isLoading);

  useEffect(() => {
    setIsLoading(false);

    // Show test email component if URL contains ?test=email
    if (window.location.search.includes("test=email")) {
      setShowTest(true);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <BackgroundShapes />
      <div className={styles.homeContainer}>
        <HeroSection ref={heroRef} t={t} />
        <ServicesSection ref={servicesRef} t={t} />
        <StatsSection t={t} />
        <AboutSection ref={aboutRef} t={t} />
        <ContactSection ref={contactRef} t={t} />

        {/* Test Email Component - hiển thị khi có ?test=email */}
        {showTest && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 10000,
              maxWidth: "400px",
            }}
          >
            <TestEmailNotification />
            <button
              onClick={() => setShowTest(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
}
