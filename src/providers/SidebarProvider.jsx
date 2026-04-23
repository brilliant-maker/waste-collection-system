import useCXSidebar from "../hooks/useCXSidebar.js";
import SidebarContext from "../contexts/SidebarContext.js";

export default function SidebarProvider({ children }) {
  
  const sidebar = useCXSidebar();
  
  return (
    <SidebarContext.Provider
      value={sidebar}
    >
      {children}
    </SidebarContext.Provider>
  );
}
