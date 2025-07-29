"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

export function useGSAPAnimations(isLoading: boolean) {
  const animationsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger, TextPlugin);

      // Kill existing animations
      animationsRef.current.forEach((anim) => anim.kill());
      animationsRef.current = [];

      // Set initial states
      gsap.set(
        [
          ".hero-title",
          ".hero-subtitle",
          ".hero-description",
          ".hero-buttons .btn",
          ".hero-image",
          ".service-card",
          ".stat-item",
          ".aboutDescription",
          ".feature-item",
          ".tech-item",
          ".contactItem",
          ".social-link",
        ],
        {
          clearProps: "all",
        }
      );

      // 1. CINEMATIC HERO ENTRANCE
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => startContinuousAnimations(),
      });

      // Dramatic camera-like zoom effect
      heroTimeline
        .set(".hero-title", {
          scale: 3,
          opacity: 0,
          filter: "blur(20px)",
          rotationZ: -10,
        })
        .to(".hero-title", {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          rotationZ: 0,
          duration: 2,
          ease: "expo.out",
        })

        // Glitch effect for gradient text
        .fromTo(
          ".gradientText",
          {
            scaleX: 0.8,
            skewX: 15,
            filter: "hue-rotate(0deg) saturate(200%)",
          },
          {
            scaleX: 1,
            skewX: 0,
            filter: "hue-rotate(360deg) saturate(100%)",
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1.5"
        )

        // Typewriter effect for subtitle
        .fromTo(
          ".hero-subtitle",
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        )

        // Liquid morphing for description
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 50,
            rotationX: -90,
            transformOrigin: "top center",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        )

        // Staggered button animation with magnetic preloader
        .fromTo(
          ".hero-buttons .btn",
          {
            opacity: 0,
            scale: 0.3,
            rotationY: 180,
            z: -200,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 1.2,
            stagger: {
              amount: 0.4,
              from: "center",
              ease: "power2.out",
            },
            ease: "back.out(1.8)",
          },
          "-=0.8"
        )

        // Hero image with parallax 3D effect
        .fromTo(
          ".hero-image",
          {
            opacity: 0,
            scale: 0.1,
            rotationY: 90,
            rotationX: 45,
            z: -500,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 1.8,
            ease: "expo.out",
          },
          "-=1.2"
        );

      animationsRef.current.push(heroTimeline);

      // 2. ADVANCED CODE ANIMATION
      const codeTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: { ease: "power2.inOut" },
      });

      codeTimeline
        .to(".code-line:nth-child(1)", {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 2,
          ease: "expo.out",
        })
        .to(
          ".code-line:nth-child(2)",
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.5,
            ease: "expo.out",
          },
          "-=1.5"
        )
        .to(
          ".code-line:nth-child(3)",
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 2.2,
            ease: "expo.out",
          },
          "-=1.2"
        )
        .to(
          ".code-line",
          {
            boxShadow:
              "0 0 20px currentColor, inset 0 0 20px rgba(255,255,255,0.1)",
            duration: 0.5,
            stagger: 0.1,
            yoyo: true,
            repeat: 1,
          },
          "-=0.5"
        );

      animationsRef.current.push(codeTimeline);

      // 3. SCROLL-TRIGGERED ANIMATIONS

      // Services section with magnetic field effect
      const servicesScrollTrigger = ScrollTrigger.create({
        trigger: ".services-section",
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          const tl = gsap.timeline();

          tl.fromTo(
            ".service-card",
            {
              opacity: 0,
              y: 200,
              rotationX: -90,
              scale: 0.5,
              transformOrigin: "center bottom",
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1.5,
              stagger: {
                amount: 0.8,
                grid: "auto",
                from: "random",
                ease: "power3.out",
              },
              ease: "expo.out",
            }
          ).fromTo(
            ".serviceIcon",
            {
              scale: 0,
              rotation: -360,
              filter: "brightness(3) saturate(0)",
            },
            {
              scale: 1.2,
              rotation: 0,
              filter: "brightness(1) saturate(1)",
              duration: 1,
              stagger: 0.2,
              ease: "elastic.out(1.5, 0.6)",
              yoyo: true,
              repeat: 1,
            },
            "-=1"
          );

          animationsRef.current.push(tl);
        },
      });

      // Stats with counter animation and particle effects
      const statsScrollTrigger = ScrollTrigger.create({
        trigger: ".stats-section",
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline();

          tl.fromTo(
            ".stat-item",
            {
              opacity: 0,
              scale: 0.1,
              rotationY: 180,
              filter: "blur(10px)",
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              filter: "blur(0px)",
              duration: 1.5,
              stagger: 0.2,
              ease: "back.out(1.7)",
            }
          ).fromTo(
            ".statNumber",
            {
              textContent: 0,
              color: "rgba(59, 130, 246, 0.3)",
            },
            {
              textContent: (i, target) => target.textContent,
              color: "rgba(59, 130, 246, 1)",
              duration: 2.5,
              ease: "power2.out",
              stagger: 0.3,
              snap: { textContent: 1 },
              onUpdate: function () {
                // Add glowing effect during count
                gsap.set(this.targets(), {
                  textShadow: "0 0 20px currentColor",
                });
              },
              onComplete: function () {
                // Remove glow when complete
                gsap.set(this.targets(), {
                  textShadow: "none",
                });
              },
            },
            "-=1"
          );

          animationsRef.current.push(tl);
        },
      });

      // About section with parallax layers
      const aboutScrollTrigger = ScrollTrigger.create({
        trigger: ".about-section",
        start: "top 85%",
        onEnter: () => {
          const tl = gsap.timeline();

          tl.fromTo(
            ".aboutDescription",
            {
              opacity: 0,
              y: 100,
              filter: "blur(5px)",
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            }
          )
            .fromTo(
              ".feature-item",
              {
                opacity: 0,
                x: -150,
                rotationZ: -15,
                scale: 0.8,
              },
              {
                opacity: 1,
                x: 0,
                rotationZ: 0,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: "back.out(1.4)",
              },
              "-=0.8"
            )
            .fromTo(
              ".tech-item",
              {
                opacity: 0,
                scale: 0,
                rotation: 180,
                filter: "saturate(0)",
              },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                filter: "saturate(1)",
                duration: 0.8,
                stagger: 0.1,
                ease: "elastic.out(1.2, 0.75)",
              },
              "-=0.6"
            );

          animationsRef.current.push(tl);
        },
      });

      // Contact section with wave effect
      const contactScrollTrigger = ScrollTrigger.create({
        trigger: ".contact-section",
        start: "top 90%",
        onEnter: () => {
          const tl = gsap.timeline();

          tl.fromTo(
            ".contactItem",
            {
              opacity: 0,
              y: 80,
              rotationX: -45,
              scale: 0.7,
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: "back.out(1.7)",
            }
          ).fromTo(
            ".social-link",
            {
              opacity: 0,
              scale: 0.1,
              rotationZ: -180,
              filter: "hue-rotate(180deg)",
            },
            {
              opacity: 1,
              scale: 1,
              rotationZ: 0,
              filter: "hue-rotate(0deg)",
              duration: 0.8,
              stagger: 0.1,
              ease: "elastic.out(1.5, 0.6)",
            },
            "-=0.5"
          );

          animationsRef.current.push(tl);
        },
      });

      animationsRef.current.push(
        servicesScrollTrigger,
        statsScrollTrigger,
        aboutScrollTrigger,
        contactScrollTrigger
      );

      // 4. CONTINUOUS AMBIENT ANIMATIONS
      function startContinuousAnimations() {
        // Floating background shapes with physics
        const shapes = gsap.utils.toArray(".bgShape");
        shapes.forEach((shape: any, i) => {
          const tl = gsap.timeline({ repeat: -1 });

          tl.to(shape, {
            rotation: 360,
            duration: 15 + i * 5,
            ease: "none",
          }).to(
            shape,
            {
              y: "random(-50, 50)",
              x: "random(-30, 30)",
              scale: "random(0.8, 1.2)",
              duration: 8 + i * 2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
            0
          );

          animationsRef.current.push(tl);
        });

        // Breathing effect for gradient text
        const breathingTl = gsap.timeline({ repeat: -1, yoyo: true });
        breathingTl.to(".gradientText", {
          scale: 1.05,
          filter: "brightness(1.2) saturate(1.3)",
          duration: 3,
          ease: "sine.inOut",
        });

        animationsRef.current.push(breathingTl);
      }

      // 5. ADVANCED HOVER INTERACTIONS

      // Magnetic buttons with trail effect
      const buttons = gsap.utils.toArray(".btn");
      buttons.forEach((button: any) => {
        const magneticTl = gsap.timeline({ paused: true });

        magneticTl.to(button, {
          scale: 1.1,
          rotationZ: 2,
          rotationY: 5,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
          filter: "brightness(1.2)",
          duration: 0.4,
          ease: "back.out(1.7)",
        });

        button.addEventListener("mouseenter", (e: MouseEvent) => {
          magneticTl.play();

          // Mouse follower effect
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          magneticTl.reverse();
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });

        // Mouse move tracking
        button.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });

      // Service cards with liquid morph
      const serviceCards = gsap.utils.toArray(".service-card");
      serviceCards.forEach((card: any) => {
        const morphTl = gsap.timeline({ paused: true });

        morphTl.to(card, {
          rotationY: 10,
          rotationX: 10,
          z: 50,
          scale: 1.05,
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          filter: "brightness(1.1) saturate(1.2)",
          duration: 0.5,
          ease: "power3.out",
        });

        card.addEventListener("mouseenter", () => {
          morphTl.play();

          // Icon bounce
          const icon = card.querySelector(".serviceIcon");
          if (icon) {
            gsap.to(icon, {
              scale: 1.3,
              rotation: 15,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          morphTl.reverse();

          // Icon reset
          const icon = card.querySelector(".serviceIcon");
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "elastic.out(1, 0.3)",
            });
          }
        });
      });

      // 6. PARALLAX SCROLL EFFECTS
      const parallaxElements = [
        { selector: ".bgShape:nth-child(1)", speed: 0.5 },
        { selector: ".bgShape:nth-child(2)", speed: 0.3 },
        { selector: ".bgShape:nth-child(3)", speed: 0.7 },
        { selector: ".hero-image", speed: 0.2 },
      ];

      parallaxElements.forEach(({ selector, speed }) => {
        const parallaxTrigger = ScrollTrigger.create({
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const elements = gsap.utils.toArray(selector);
            elements.forEach((element: any) => {
              gsap.set(element, {
                yPercent: -self.progress * 100 * speed,
                rotationZ: self.progress * 360 * speed * 0.5,
              });
            });
          },
        });

        animationsRef.current.push(parallaxTrigger);
      });

      // 7. SCROLL VELOCITY EFFECTS
      let velocity = 0;
      let lastScrollTop = 0;

      const velocityTrigger = ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const currentScrollTop = self.scroll();
          velocity = currentScrollTop - lastScrollTop;
          lastScrollTop = currentScrollTop;

          // Apply velocity-based effects
          gsap.to(".bgShape", {
            rotationZ: `+=${velocity * 0.1}`,
            duration: 0.3,
            ease: "power2.out",
          });

          // Blur effect on fast scroll
          if (Math.abs(velocity) > 10) {
            gsap.to("main", {
              filter: "blur(2px)",
              duration: 0.1,
              ease: "power2.out",
              onComplete: () => {
                gsap.to("main", {
                  filter: "blur(0px)",
                  duration: 0.5,
                  ease: "power2.out",
                });
              },
            });
          }
        },
      });

      animationsRef.current.push(velocityTrigger);

      // Cleanup function
      return () => {
        animationsRef.current.forEach((anim) => {
          if (anim.kill) anim.kill();
          if (anim.killAll) anim.killAll();
        });
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }
  }, [isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationsRef.current.forEach((anim) => {
        if (anim.kill) anim.kill();
        if (anim.killAll) anim.killAll();
      });
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
}
