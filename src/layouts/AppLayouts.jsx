import useSession from "../hooks/useSession.js";
import PublicLayout from "./PublicLayout.jsx";
import ProtectedLayout from "./ProtectedLayout.jsx";
import Center from "../components/Center.jsx";
import LoadingText from "../components/LoadingText.jsx";

export default function AppLayouts({ children }) {
  const { isSessionLoading, isAuthenticated } = useSession();

  if (isSessionLoading) {
    return (
      <Center>
        <LoadingText>
          Loading...
        </LoadingText>;
      </Center>
    );
  }
  
  return isAuthenticated ? (
    <ProtectedLayout key="protected">
      {children}
    </ProtectedLayout>
  ) : (
    <PublicLayout key="public">
      {children}
    </PublicLayout>
  );
}
