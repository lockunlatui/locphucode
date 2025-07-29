import { useEffect, useRef, MutableRefObject } from "react";
import { gsap } from "gsap";

export interface MenuAnimations {
  initMenuAnimations: () => void;
  showMenu: () => void;
  hideMenu: () => void;
  animateItems: () => void;
}

export const useMenuAnimations = (
  menuRef: MutableRefObject<HTMLElement | null>,
  isOpen: boolean
): MenuAnimations => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const initMenuAnimations = () => {
    if (!menuRef.current) return;

    const menuItems = menuRef.current.querySelectorAll(".menu-item");
    const menuBg = menuRef.current.querySelector(".menu-background");
    const logo = menuRef.current.querySelector(".menu-logo");

    // Set initial states
    gsap.set(menuBg, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(menuItems, { y: -50, opacity: 0 });
    gsap.set(logo, { scale: 0.8, opacity: 0 });

    // Create timeline for menu animations
    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current
      .to(menuBg, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        logo,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .to(
        menuItems,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
  };

  const showMenu = () => {
    timelineRef.current?.play();
  };

  const hideMenu = () => {
    timelineRef.current?.reverse();
  };

  const animateItems = () => {
    if (!menuRef.current) return;

    const items = menuRef.current.querySelectorAll(".menu-item");

    items.forEach((item, index) => {
      const link = item.querySelector("a");
      if (!link) return;

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(item, {
          scale: 1.05,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(link, {
          color: "#ffd700",
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(link, {
          color: "#ffffff",
          duration: 0.3,
        });
      };

      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);
    });
  };

  useEffect(() => {
    initMenuAnimations();
    animateItems();

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      showMenu();
    } else {
      hideMenu();
    }
  }, [isOpen]);

  return {
    initMenuAnimations,
    showMenu,
    hideMenu,
    animateItems,
  };
};
