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
      // Keep stale data for 30 seconds
      staleTime: 1000 * 30, 
    },
  },
});

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider
      client={queryClient}>
      <DeviceProvider>
        <ThemeProvider>
          <SessionProvider>
            <ProfileProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </ProfileProvider>
          </SessionProvider>
        </ThemeProvider>
      </DeviceProvider>
    </QueryClientProvider>
  );
}
