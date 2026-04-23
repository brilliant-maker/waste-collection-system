import SessionProvider from "./SessionProvider.jsx";
import ProfileProvider from "./ProfileProvider.jsx";
import DeviceProvider from "./DeviceProvider.jsx";
import ThemeProvider from "./ThemeProvider.jsx";
import SidebarProvider from "./SidebarProvider.jsx";

export default function AppProviders({ children }) {
  return (
    <SessionProvider>
      <ProfileProvider>
        <DeviceProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </DeviceProvider>
      </ProfileProvider>
    </SessionProvider>
  );
}
