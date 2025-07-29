// Application constants - Avoid hardcoding strings and URLs
export const APP_CONFIG = {
  COMPANY: {
    NAME: "LocDo.Tech",
    VERSION: "1.0.0",
    DESCRIPTION: "Full-stack Developer & Educator Portfolio",
    AUTHOR: "Do Xuan Loc",
    EMAIL: "locdx@locdo.tech",
    PHONE: "+84 XXX XXX XXX",
    LOCATION: "TP. Hồ Chí Minh, Việt Nam",
  },
  NAVIGATION: {
    HERO: "#hero",
    SERVICES: "#services",
    ABOUT: "#about",
    CONTACT: "#contact",
  },
  SECTIONS: {
    HERO: "hero",
    SERVICES: "services",
    ABOUT: "about",
    CONTACT: "contact",
  },
  UI: {
    ICONS: {
      // Hero buttons
      CONTACT: "📞",
      SERVICES: "🎓",
      // Service icons
      WEB: "🌐",
      MOBILE: "📱",
      PYTHON: "🐍",
      EDUCATION: "🎓",
      // Contact icons
      EMAIL: "📧",
      PHONE: "�",
      LOCATION: "�",
      // Social icons
      LINKEDIN: "💼",
      GITHUB: "🐙",
      // Feature icons
      FAST: "⚡",
      PRECISE: "🎯",
      SECURE: "�",
    },
  },
  STATS: {
    PROJECTS: "150",
    STUDENTS: "50",
    SATISFACTION: "100%",
    EXPERIENCE: "3+",
  },
  TECH_STACK: ["React", "Next.js", "Python", "Node.js", "TypeScript", "GSAP"],
  SOCIAL_LINKS: {
    LINKEDIN: "https://linkedin.com/in/locdo-dev",
    GITHUB: "https://github.com/lockunlatui",
    EMAIL: "mailto:locdx@locdo.tech",
    WEBSITE: "https://locdo.tech",
  },
  ANIMATION_CONFIG: {
    DURATIONS: {
      FAST: 0.3,
      NORMAL: 0.6,
      SLOW: 1.2,
      CODE: 2,
    },
    DELAYS: {
      STAGGER: 0.1,
      SEQUENCE: 0.2,
      SECTION: 0.4,
    },
    EASING: {
      OUT: "power3.out",
      IN_OUT: "power2.inOut",
      BACK: "back.out(1.7)",
      ELASTIC: "elastic.out(1, 0.5)",
    },
  },
} as const;

export const SUPPORTED_LOCALES = ["vi", "en", "ko", "ja", "zh"] as const;
export const DEFAULT_LOCALE = "vi" as const;

export const LOADING_MESSAGES = {
  DEFAULT: "Loading...",
  VI: "Đang tải...",
  EN: "Loading...",
  KO: "로딩 중...",
  JA: "読み込み中...",
  ZH: "加载中...",
} as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type NavigationSection = keyof typeof APP_CONFIG.SECTIONS;
