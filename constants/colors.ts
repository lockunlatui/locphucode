// Modern Color Palette - Improved UI Design
export const COLORS = {
  // Dark Mode Primary Colors
  dark: {
    900: "#0a0e1a", // Ultra dark background
    800: "#1a1f2e", // Dark background
    700: "#2a3142", // Card backgrounds
    600: "#3a4356", // Borders
    500: "#4a556a", // Disabled text
    400: "#5a677e", // Secondary text
    300: "#6a7992", // Primary text muted
    200: "#7a8ba6", // Primary text
    100: "#8a9dba", // Accent text
    50: "#9aafce",  // Light accent
  },

  // Modern Blue Gradient
  primary: {
    900: "#0f172a", // Slate 900
    800: "#1e293b", // Slate 800
    700: "#334155", // Slate 700
    600: "#475569", // Slate 600
    500: "#64748b", // Slate 500
    400: "#94a3b8", // Slate 400
    300: "#cbd5e1", // Slate 300
    200: "#e2e8f0", // Slate 200
    100: "#f1f5f9", // Slate 100
    50: "#f8fafc",  // Slate 50
  },

  // Vibrant Accent Colors
  electric: {
    500: "#3b82f6", // Blue 500 - Primary CTA
    400: "#60a5fa", // Blue 400
    300: "#93c5fd", // Blue 300
    glow: "rgba(59, 130, 246, 0.2)", // Blue glow
  },

  // Secondary Accent
  purple: {
    500: "#8b5cf6", // Purple 500
    400: "#a78bfa", // Purple 400
    300: "#c4b5fd", // Purple 300
    glow: "rgba(139, 92, 246, 0.2)", // Purple glow
  },

  // Success/Accent Green
  emerald: {
    500: "#10b981", // Emerald 500
    400: "#34d399", // Emerald 400
    300: "#6ee7b7", // Emerald 300
    glow: "rgba(16, 185, 129, 0.2)", // Emerald glow
  },

  // Warning/Highlight
  amber: {
    500: "#f59e0b", // Amber 500
    400: "#fbbf24", // Amber 400
    300: "#fcd34d", // Amber 300
    glow: "rgba(245, 158, 11, 0.2)", // Amber glow
  },

  // Error/Danger
  red: {
    500: "#ef4444", // Red 500
    400: "#f87171", // Red 400
    300: "#fca5a5", // Red 300
    glow: "rgba(239, 68, 68, 0.2)", // Red glow
// Semantic Theme Colors
export const THEME_COLORS = {
  // Background colors
  background: {
    primary: COLORS.dark[900],     // Ultra dark
    secondary: COLORS.dark[800],   // Dark
    tertiary: COLORS.dark[700],    // Card backgrounds
    hover: COLORS.dark[600],       // Hover states
  },

  // Text colors
  text: {
    primary: COLORS.primary[100],    // Main text (light)
    secondary: COLORS.primary[200],  // Secondary text
    muted: COLORS.primary[400],      // Muted text
    inverse: COLORS.dark[900],       // Dark text on light backgrounds
  },

  // Border colors
  border: {
    primary: COLORS.dark[600],       // Main borders
    secondary: COLORS.dark[500],     // Secondary borders
    accent: COLORS.electric[500],    // Accent borders
  },

  // Interactive colors
  interactive: {
    primary: COLORS.electric[500],   // Primary buttons/links
    primaryHover: COLORS.electric[400],
    secondary: COLORS.purple[500],   // Secondary buttons
    secondaryHover: COLORS.purple[400],
    success: COLORS.emerald[500],    // Success states
    warning: COLORS.amber[500],      // Warning states
    error: COLORS.red[500],          // Error states
  },

  // Glow effects
  glow: {
    primary: COLORS.electric.glow,
    secondary: COLORS.purple.glow,
    success: COLORS.emerald.glow,
    warning: COLORS.amber.glow,
    error: COLORS.red.glow,
  },
} as const;

// Advanced gradient definitions
export const GRADIENTS = {
  // Hero gradients
  hero: {
    primary: `linear-gradient(135deg, ${COLORS.dark[900]} 0%, ${COLORS.dark[800]} 50%, ${COLORS.primary[900]} 100%)`,
    accent: `linear-gradient(135deg, ${COLORS.electric[500]} 0%, ${COLORS.purple[500]} 100%)`,
    text: `linear-gradient(135deg, ${COLORS.electric[400]} 0%, ${COLORS.purple[400]} 100%)`,
  },

  // Card gradients
  card: {
    primary: `linear-gradient(135deg, ${COLORS.dark[800]} 0%, ${COLORS.dark[700]} 100%)`,
    hover: `linear-gradient(135deg, ${COLORS.dark[700]} 0%, ${COLORS.dark[600]} 100%)`,
    accent: `linear-gradient(135deg, ${COLORS.electric.glow} 0%, ${COLORS.purple.glow} 100%)`,
  },

  // Button gradients
  button: {
    primary: `linear-gradient(135deg, ${COLORS.electric[500]} 0%, ${COLORS.electric[400]} 100%)`,
    secondary: `linear-gradient(135deg, ${COLORS.purple[500]} 0%, ${COLORS.purple[400]} 100%)`,
    success: `linear-gradient(135deg, ${COLORS.emerald[500]} 0%, ${COLORS.emerald[400]} 100%)`,
  },

  // Background patterns
  pattern: {
    mesh: `radial-gradient(circle at 25% 25%, ${COLORS.electric.glow} 0%, transparent 50%),
           radial-gradient(circle at 75% 75%, ${COLORS.purple.glow} 0%, transparent 50%)`,
    dots: `radial-gradient(circle, ${COLORS.dark[600]} 1px, transparent 1px)`,
  },
} as const;

// Animation-specific colors
export const ANIMATION_COLORS = {
  // Particle colors
  particles: [
    COLORS.electric[400],
    COLORS.purple[400],
    COLORS.emerald[400],
    COLORS.amber[400],
  ],

  // Code animation colors
  code: {
    primary: COLORS.electric[400],
    secondary: COLORS.purple[400],
    tertiary: COLORS.emerald[400],
  },

  // Glow effects for animations
  glows: {
    primary: `0 0 20px ${COLORS.electric.glow}`,
    secondary: `0 0 20px ${COLORS.purple.glow}`,
    success: `0 0 20px ${COLORS.emerald.glow}`,
  },
} as const;

export type ColorKeys = keyof typeof COLORS;
export type ThemeColorKeys = keyof typeof THEME_COLORS;
export const THEME_COLORS = {
  // Primary colors
  primary: COLORS.delftBlue[950], // #3d405b
  primaryLight: COLORS.delftBlue[500],
  primaryDark: COLORS.delftBlue[1000], // #0c0d12

  // Secondary colors
  secondary: COLORS.cambridgeBlue[900], // #81b29a
  secondaryLight: COLORS.cambridgeBlue[300],
  secondaryDark: COLORS.cambridgeBlue[950], // #17261f

  // Accent colors
  accent: COLORS.sunset[900], // #f2cc8f
  accentLight: COLORS.sunset[300],
  accentDark: COLORS.sunset[950], // #442d08

  // Status colors
  success: COLORS.cambridgeBlue[700],
  warning: COLORS.sunset[600],
  error: COLORS.burntSienna[700], // #e07a5f
  info: COLORS.delftBlue[600],

  // Background colors
  background: {
    primary: COLORS.delftBlue[950], // Main dark background
    secondary: COLORS.delftBlue[1000], // Darker sections
    accent: `rgba(244, 241, 222, 0.05)`, // Light overlay
  },

  // Text colors
  text: {
    primary: COLORS.eggshell[200], // #f4f1de
    secondary: `rgba(244, 241, 222, 0.9)`,
    tertiary: `rgba(244, 241, 222, 0.8)`,
    muted: `rgba(244, 241, 222, 0.6)`,
  },

  // UI element colors
  border: `rgba(244, 241, 222, 0.1)`,
  shadow: `rgba(61, 64, 91, 0.3)`,
  overlay: `rgba(12, 13, 18, 0.8)`,
} as const;

// Gradients
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.delftBlue[950]} 0%, ${COLORS.delftBlue[1000]} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.cambridgeBlue[900]} 0%, ${COLORS.cambridgeBlue[950]} 100%)`,
  accent: `linear-gradient(135deg, ${COLORS.sunset[900]} 0%, ${COLORS.sunset[950]} 100%)`,
  error: `linear-gradient(135deg, ${COLORS.burntSienna[700]} 0%, ${COLORS.burntSienna[950]} 100%)`,

  // Background gradients
  backgroundPrimary: `linear-gradient(135deg, ${COLORS.delftBlue[950]} 0%, ${COLORS.delftBlue[1000]} 100%)`,
  backgroundSecondary: `linear-gradient(135deg, ${COLORS.cambridgeBlue[900]} 0%, ${COLORS.cambridgeBlue[950]} 100%)`,
  backgroundAccent: `linear-gradient(135deg, ${COLORS.burntSienna[700]} 0%, ${COLORS.burntSienna[950]} 100%)`,
} as const;

export type ColorKey = keyof typeof COLORS;
export type ThemeColorKey = keyof typeof THEME_COLORS;
export type GradientKey = keyof typeof GRADIENTS;
