import { useEffect, useState } from "react";
import useDevice from "./useDevice.js";

export default function useCXTheme() {
  const device = useDevice();
  const prefersDark = device?.prefersDark ?? false;

  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "system";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  const resolvedTheme =
    theme === "system"
      ? prefersDark
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    if (typeof document === "undefined") return;

    const current = document.documentElement.getAttribute("data-theme");

    if (current !== resolvedTheme) {
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    }
  }, [resolvedTheme]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "system") return "dark";
      if (prev === "dark") return "light";
      return "dark";
    });
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}

