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
import styles from "../Home.module.css";

interface HomePageClientProps {
  locale: string;
}

export default function HomePageClient({ locale }: HomePageClientProps) {
  const [isLoading, setIsLoading] = useState(true);
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
      </div>
    </>
  );
}
