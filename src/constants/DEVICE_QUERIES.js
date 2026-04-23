const DEVICE_QUERIES = {
  // =========================
  // 📱 Core Breakpoints (Resolution)
  // =========================
  isMobile: "(max-width: 640px)",
  isTablet: "(min-width: 641px) and (max-width: 1024px)",
  isLaptop: "(min-width: 1025px) and (max-width: 1280px)",
  isDesktop: "(min-width: 1281px)",

  // =========================
  // 🔄 Orientation
  // =========================
  isPortrait: "(orientation: portrait)",
  isLandscape: "(orientation: landscape)",

  // =========================
  // 📏 Helpers (keep minimal)
  // =========================
  isAboveMobile: "(min-width: 641px)",
  isAboveTablet: "(min-width: 1025px)",
  isBelowTablet: "(max-width: 1024px)",
  isBelowLaptop: "(max-width: 1280px)",

  // =========================
  // 🎯 User Preferences
  // =========================
  prefersDark: "(prefers-color-scheme: dark)",
  prefersLight: "(prefers-color-scheme: light)",

  prefersReducedMotion: "(prefers-reduced-motion: reduce)",
  prefersNoMotion: "(prefers-reduced-motion: no-preference)",

  prefersHighContrast: "(prefers-contrast: more)",
  prefersLowContrast: "(prefers-contrast: less)",

  // =========================
  // 🖱️ Input & Interaction
  // =========================
  isTouchDevice: "(pointer: coarse)",
  isMouseDevice: "(pointer: fine)",

  canHover: "(hover: hover)",
  cannotHover: "(hover: none)",

  // =========================
  // 📺 Display Quality
  // =========================
  isHighResolution: "(min-resolution: 2dppx)",

  // =========================
  // 🌐 Accessibility / UX
  // =========================
  prefersReducedTransparency: "(prefers-reduced-transparency: reduce)",

  // =========================
  // 🧪 Optional Advanced
  // =========================
  isPrint: "print",
};

export default DEVICE_QUERIES;
