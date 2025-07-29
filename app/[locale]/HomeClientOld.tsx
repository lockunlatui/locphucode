"use client";
import React from "react";
import { useTranslation } from "@/lib/i18n";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      // Register GSAP plugins inside useEffect
      gsap.registerPlugin(ScrollTrigger);
      // Hero section animations
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-buttons .btn",
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, scale: 0.8, rotation: -10 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.8"
        );

      // Code animation
      gsap.to(".code-line", {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
      });

      // Services section
      ScrollTrigger.create({
        trigger: ".services-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".service-card",
            { opacity: 0, y: 50, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.2,
              ease: "back.out(1.7)",
            }
          );
        },
      });

      // Stats section
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 80%",
        onEnter: () => {
          // Animate stat numbers
          document.querySelectorAll(".stat-number").forEach((stat) => {
            const target = parseInt(stat.textContent || "0");
            gsap.fromTo(
              stat,
              { textContent: 0 },
              {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                  stat.textContent = Math.ceil(this.targets()[0].textContent);
                },
              }
            );
          });

          gsap.fromTo(
            ".stat-item",
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "elastic.out(1, 0.5)",
            }
          );
        },
      });

      // About section
      ScrollTrigger.create({
        trigger: ".about-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".feature-item",
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
            }
          );

          gsap.fromTo(
            ".tech-item",
            { opacity: 0, rotationY: 90, scale: 0.8 },
            {
              opacity: 1,
              rotationY: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
            }
          );
        },
      });

      // Contact section
      ScrollTrigger.create({
        trigger: ".contact-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".contact-item",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              ease: "back.out(1.7)",
            }
          );

          gsap.fromTo(
            ".social-link",
            { opacity: 0, scale: 0.8, rotation: -180 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "elastic.out(1, 0.5)",
            }
          );
        },
      });

      // Parallax effect for background shapes
      gsap.to(".bg-shape.shape-1", {
        y: -50,
        rotation: 10,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".bg-shape.shape-2", {
        y: 30,
        rotation: -5,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".bg-shape.shape-3", {
        y: -80,
        rotation: 15,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Background Shapes */}
      <div className={styles.bgShapes}>
        <div className={`${styles.bgShape} shape-1`}></div>
        <div className={`${styles.bgShape} shape-2`}></div>
        <div className={`${styles.bgShape} shape-3`}></div>
      </div>

      <div className={styles.homeContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroContent}>
            <div className="hero-text">
              <h1 className={styles.heroTitle}>
                Welcome to{" "}
                <span className={styles.gradientText}>{t("company.name")}</span>
              </h1>
              <p className={styles.heroSubtitle}>{t("company.tagline")}</p>
              <p className={styles.heroDescription}>
                {t("company.description")}
              </p>
              <div className={styles.heroButtons}>
                <a
                  href="#contact"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  <span className={styles.btnIcon}>📞</span>
                  {t("company.cta.contact")}
                </a>
                <a
                  href="#services"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  <span className={styles.btnIcon}>🎓</span>
                  {t("company.cta.courses")}
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
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
        {/* Services Section */}
        <section
          className={`${styles.servicesSection} services-section`}
          id="services"
          ref={servicesRef}
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t("sections.services")}</h2>
              <p className={styles.sectionSubtitle}>{t("services.subtitle")}</p>
            </div>
            <div className={styles.servicesGrid}>
              <div className={`${styles.serviceCard} service-card`}>
                <span className={styles.serviceIcon}>🌐</span>
                <h3 className={styles.serviceTitle}>
                  {t("services.web.title")}
                </h3>
                <p className={styles.serviceDesc}>
                  {t("services.web.description")}
                </p>
              </div>
              <div className={`${styles.serviceCard} service-card`}>
                <span className={styles.serviceIcon}>📱</span>
                <h3 className={styles.serviceTitle}>
                  {t("services.mobile.title")}
                </h3>
                <p className={styles.serviceDesc}>
                  {t("services.mobile.description")}
                </p>
              </div>
              <div className={`${styles.serviceCard} service-card`}>
                <span className={styles.serviceIcon}>🐍</span>
                <h3 className={styles.serviceTitle}>
                  {t("services.python.title")}
                </h3>
                <p className={styles.serviceDesc}>
                  {t("services.python.description")}
                </p>
              </div>
              <div className={`${styles.serviceCard} service-card`}>
                <span className={styles.serviceIcon}>🎓</span>
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
        {/* Stats Section */}
        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={`${styles.statItem} stat-item`}>
                <div className={styles.statNumber}>150</div>
                <div className={styles.statLabel}>{t("stats.projects")}</div>
              </div>
              <div className={`${styles.statItem} stat-item`}>
                <div className={styles.statNumber}>50</div>
                <div className={styles.statLabel}>{t("stats.students")}</div>
              </div>
              <div className={`${styles.statItem} stat-item`}>
                <div className={styles.statNumber}>100</div>
                <div className={styles.statLabel}>
                  {t("stats.satisfaction")}
                </div>
              </div>
              <div className={`${styles.statItem} stat-item`}>
                <div className={styles.statNumber}>3+</div>
                <div className={styles.statLabel}>{t("stats.experience")}</div>
              </div>
            </div>
          </div>
        </section>{" "}
        {/* About Section */}
        <section className="about-section" ref={aboutRef}>
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title">{t("sections.about")}</h2>
                <p className="about-description">{t("about.description")}</p>
                <div className="about-features">
                  <div className="feature-item">
                    <span className="feature-icon">⚡</span>
                    <span>{t("features.fast")}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span>{t("features.precise")}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔒</span>
                    <span>{t("features.secure")}</span>
                  </div>
                </div>
              </div>
              <div className="about-visual">
                <div className="tech-stack">
                  <div className="tech-item">React</div>
                  <div className="tech-item">Next.js</div>
                  <div className="tech-item">Python</div>
                  <div className="tech-item">Node.js</div>
                  <div className="tech-item">TypeScript</div>
                  <div className="tech-item">GSAP</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="contact-section" id="contact" ref={contactRef}>
          <div className="container">
            <div className="contact-content">
              <h2 className="section-title">{t("sections.contact")}</h2>
              <p className="section-subtitle">{t("contact.subtitle")}</p>

              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span className="contact-text">{t("contact.email")}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">{t("contact.phone")}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">
                    TP. Hồ Chí Minh, Việt Nam
                  </span>
                </div>
              </div>

              <div className="social-links">
                <a
                  href="https://linkedin.com/in/locdo-dev"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>💼</span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/lockunlatui"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>🐙</span>
                  GitHub
                </a>
                <a href="mailto:locdx@locdo.tech" className="social-link">
                  <span>📧</span>
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
