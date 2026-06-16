import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import SessionProvider from "./SessionProvider.jsx";
import ProfileProvider from "./ProfileProvider.jsx";
import DeviceProvider from "./DeviceProvider.jsx";
import ThemeProvider from "./ThemeProvider.jsx";
import SidebarProvider from "./SidebarProvider.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep everything fresh for at least 30 seconds by default
      staleTime: 1000 * 30, 
    },
  },
});

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider
      client={queryClient}>
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
    </QueryClientProvider>
  );
}
