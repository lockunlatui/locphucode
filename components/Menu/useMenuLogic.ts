import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import { MenuItem, MenuState, MenuActions } from "./types";

export const useMenuLogic = (
  locale: string
): {
  state: MenuState;
  actions: MenuActions;
  menuItems: MenuItem[];
} => {
  const { t } = useTranslation(locale);

  const [state, setState] = useState<MenuState>({
    isOpen: false,
    activeItem: null,
    isScrolled: false,
  });

  const menuItems: MenuItem[] = [
    {
      id: "home",
      label: t("navigation.home"),
      href: `/${locale}`,
      icon: "🏠",
    },
    {
      id: "courses",
      label: t("navigation.courses"),
      href: `/${locale}/get-married`,
      icon: "🎓",
    },
    {
      id: "contact",
      label: t("navigation.contact"),
      href: "tel:+84999xxx999",
      icon: "📞",
      isExternal: true,
    },
  ];

  const toggleMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const closeMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const setActiveItem = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, activeItem: id }));
  }, []);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    setState((prev) => ({ ...prev, isScrolled: scrolled }));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    state,
    actions: {
      toggleMenu,
      closeMenu,
      setActiveItem,
      handleScroll,
    },
    menuItems,
  };
};
