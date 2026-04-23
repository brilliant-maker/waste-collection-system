import Header from "../components/Header.jsx";
import Navigation from "../components/Navigation.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import Sidebar from "../components/Sidebar.jsx";
import CopyrightText from "../components/CopyrightText.jsx";
import ProtectedLinks from "../links/ProtectedLinks.jsx";
import useDevice from "../hooks/useDevice.js";
import useTheme from "../hooks/useTheme.js";
import useSidebar from "../hooks/useSidebar.js";
import useSBAuth  from "../hooks/useSBAuth.js";
import "../styles/ProtectedLayout.css";

export default function ProtectedLayout({children}) {
  const { isMobile } = useDevice();
  
  const { toggleTheme } = useTheme();
  
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();
  
  const { signOut, isSigningOut } = useSBAuth();

  return (
    <div className="protected-layout">
      <Header className="protected-header">
        {isMobile && (
        <Button
          className="button-outline button-small"
          onClick={openSidebar}>
          Open Menu
        </Button>
        )}
        <Button
          className="button-outline button-small"
          onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Header>

      <Sidebar className={`${isSidebarOpen ? "open" : ""}`}>
        {isMobile && (
        <Header className="sidebar-header">
          <Button
            className="button-outline button-small"
            onClick={closeSidebar}>
            Close Menu
          </Button>
        </Header>)}
        <Main className="sidebar-main">
          <Navigation>
            <ProtectedLinks />
          </Navigation>
        </Main>
        <Footer className="sidebar-footer">
          <Button
            className="button-outline button-medium"
            onClick={signOut}
            disabled={isSigningOut}>
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </Button>
        </Footer>
      </Sidebar>

      <div
        className={`overlay ${isSidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <Main className="protected-main">
        {children}
      </Main>

      <Footer className="protected-footer">
        <CopyrightText />
      </Footer>
    </div>
  );
}
