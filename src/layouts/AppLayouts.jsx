import useSession from "../hooks/useSession.js";
import PublicLayout from "./PublicLayout.jsx";
import ProtectedLayout from "./ProtectedLayout.jsx";

export default function AppLayouts({ children }) {
  const { isAuthenticated } = useSession();

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
