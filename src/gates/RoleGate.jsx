import { Navigate, Outlet } from "react-router";
import useSession from "../hooks/useSession.js";
import useProfile from "../hooks/useProfile.js";
import Center from "../components/Center.jsx";
import LoadingText from "../components/LoadingText.jsx";
import ErrorText from "../components/ErrorText.jsx";

export default function RoleGate({
  roles,
  redirectTo = "/unauthorized",
  showLoading = true,
  children
}) {
  const {
    isAuthenticated,
    isSessionLoading
  } = useSession();

  const {
    profile,
    isProfileLoading,
    profileError
  } = useProfile();

  // ─── 1. Session loading ───
  if (isSessionLoading) {
    if (!showLoading) return null;
    return (
      <Center>
        <LoadingText>
          Loading...
        </LoadingText>
      </Center>
    );
  }

  // ─── 2. Not authenticated ───
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // ─── 3. Profile loading ───
  if (isProfileLoading) {
    if (!showLoading) return null;
    return (
      <Center>
        <LoadingText>
          Loading...
        </LoadingText>
      </Center>
    );
  }

  // ─── 4. Profile error ───
  if (profileError) {
    return (
      <Center>
        <ErrorText>
          {profileError.message || "Failed to load profile"}
        </ErrorText>
      </Center>
    );
  }

  // ─── 5. No profile (IMPORTANT) ───
  if (!profile) {
    return <Navigate to={redirectTo} replace />;
  }

  const role = profile.role_type;

  // ─── 6. Missing role ───
  if (!role) {
    return <Navigate to={redirectTo} replace />;
  }

  // ─── 7. Role check ───
  const requiredRoles = Array.isArray(roles) ? roles : [roles];

  if (!requiredRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // ─── 8. Access granted ───
  return children ?? <Outlet />;
}
