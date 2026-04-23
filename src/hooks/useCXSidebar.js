import { useEffect, useState } from "react";
import useDevice from "./useDevice.js";

export default function useCXSidebar() {
  const { isMobile, isTablet, isLaptop, isDesktop } = useDevice();

  // Sidebar modes: "hidden" | "drawer" | "mini" | "full"
  const [sidebarMode, setSidebarMode] = useState("full");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto layout behavior
  useEffect(() => {
    if (isMobile) {
      setSidebarMode("drawer");
      setIsSidebarOpen(false);
    } else if (isTablet) {
      setSidebarMode("mini");
      setIsSidebarOpen(true);
    } else {
      setSidebarMode("full");
      setIsSidebarOpen(true);
    }
  }, [isMobile, isTablet, isLaptop, isDesktop]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  
  return {
    sidebarMode,
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar
  }
}
