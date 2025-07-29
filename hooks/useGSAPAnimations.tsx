"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGSAPAnimations(isLoading: boolean) {
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      // Set default values for animations
      gsap.set(
        [
          ".hero-title",
          ".hero-subtitle",
          ".hero-description",
          ".hero-buttons .btn",
          ".hero-image",
        ],
        {
          clearProps: "all",
        }
      );

      // Create master timeline for hero animations
      const masterTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Enhanced Hero Title Animation
      masterTimeline
        .fromTo(
          ".hero-title",
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationX: -45,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.4,
            ease: "back.out(1.4)",
          }
        )

        // Gradient Text Glow Effect
        .to(
          ".gradientText",
          {
            filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
          "-=0.7"
        )

        // Subtitle with typewriter effect
        .fromTo(
          ".hero-subtitle",
          {
            opacity: 0,
            x: -100,
            rotationY: 45,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: "elastic.out(1, 0.8)",
          },
          "-=0.8"
        )

        // Description with wave effect
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            filter: "blur(5px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
          },
          "-=0.5"
        )

        // Enhanced Button Animations
        .fromTo(
          ".hero-buttons .btn",
          {
            opacity: 0,
            y: 40,
            rotationX: -90,
            scale: 0.8,
            transformOrigin: "center top",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.8)",
          },
          "-=0.6"
        )

        // Hero Image with 3D rotation and morphing
        .fromTo(
          ".hero-image",
          {
            opacity: 0,
            scale: 0.3,
            rotation: -45,
            rotationY: 180,
            transformOrigin: "center center",
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.6)",
          },
          "-=1"
        );

      // Advanced Code Animation with Particle Effects
      const codeTimeline = gsap.timeline({ repeat: -1, yoyo: true });
      codeTimeline
        .to(".code-line:nth-child(1)", {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "left center",
        })
        .to(
          ".code-line:nth-child(2)",
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.out",
            transformOrigin: "left center",
          },
          "-=1"
        )
        .to(
          ".code-line:nth-child(3)",
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.out",
            transformOrigin: "left center",
          },
          "-=0.8"
        )
        .to(
          ".code-line",
          {
            filter: "drop-shadow(0 0 10px currentColor)",
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.5"
        );

      // Floating Background Shapes Animation
      gsap.to(".bgShape:nth-child(1)", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".bgShape:nth-child(2)", {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".bgShape:nth-child(3)", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Enhanced Services Section Animation
      ScrollTrigger.create({
        trigger: ".services-section",
        start: "top 75%",
        onEnter: () => {
          const serviceCards = gsap.utils.toArray(".service-card");

          gsap.fromTo(
            serviceCards,
            {
              opacity: 0,
              y: 100,
              rotationX: -45,
              scale: 0.8,
              transformOrigin: "center bottom",
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1,
              stagger: {
                amount: 0.8,
                grid: "auto",
                from: "center",
                ease: "power2.out",
              },
              ease: "back.out(1.4)",
            }
          );

          // Icon bounce effect
          gsap.fromTo(
            ".service-card .serviceIcon",
            {
              scale: 0,
              rotation: -180,
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "elastic.out(1.2, 0.75)",
              delay: 0.3,
            }
          );
        },
      });

      // Advanced Stats Animation with Count-up Effect
      ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            ".stat-item",
            {
              opacity: 0,
              scale: 0.3,
              rotation: 45,
              transformOrigin: "center center",
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              stagger: 0.15,
              ease: "elastic.out(1, 0.6)",
            }
          );

          // Number count-up animation
          gsap.fromTo(
            ".statNumber",
            {
              textContent: 0,
              filter: "blur(5px)",
            },
            {
              textContent: (i, target) => target.textContent,
              filter: "blur(0px)",
              duration: 2,
              ease: "power2.out",
              stagger: 0.2,
              snap: { textContent: 1 },
              delay: 0.5,
            }
          );
        },
      });

      // About Section with Parallax Effect
      ScrollTrigger.create({
        trigger: ".about-section",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            ".aboutDescription",
            {
              opacity: 0,
              y: 50,
              filter: "blur(3px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "power2.out",
            }
          );

          gsap.fromTo(
            ".feature-item",
            {
              opacity: 0,
              x: -100,
              rotationY: -45,
            },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(1.7)",
            }
          );

          gsap.fromTo(
            ".tech-item",
            {
              opacity: 0,
              scale: 0.5,
              rotation: 180,
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(2)",
            }
          );
        },
      });

      // Contact Section with Magnetic Effect
      ScrollTrigger.create({
        trigger: ".contact-section",
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            ".contactItem",
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.4)",
            }
          );

          gsap.fromTo(
            ".social-link",
            {
              opacity: 0,
              rotationX: -90,
              transformOrigin: "center top",
            },
            {
              opacity: 1,
              rotationX: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(2)",
              delay: 0.3,
            }
          );
        },
      });

      // Advanced Hover Effects for Interactive Elements
      const buttons = gsap.utils.toArray(".btn");
      buttons.forEach((button: any) => {
        const tl = gsap.timeline({ paused: true });

        tl.to(button, {
          scale: 1.05,
          rotationY: 5,
          z: 10,
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        button.addEventListener("mouseenter", () => tl.play());
        button.addEventListener("mouseleave", () => tl.reverse());
      });

      // Service Card Magnetic Effect
      const serviceCards = gsap.utils.toArray(".service-card");
      serviceCards.forEach((card: any) => {
        const tl = gsap.timeline({ paused: true });

        tl.to(card, {
          rotationY: 5,
          rotationX: 5,
          z: 20,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out",
        });

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

      // Parallax Scroll Effects
      gsap.to(".bgShape", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.killTweensOf("*");
      };
    }
  }, [isLoading]);
}
