import { Navigate, Outlet } from "react-router";
import useSession from "../hooks/useSession.js";
import useProfile from "../hooks/useProfile.js";
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

  // ─── 1. Loading State ───
  if (isSessionLoading || isProfileLoading) {
    if (!showLoading) return null;

    return (
      <LoadingText>
        Loading...
      </LoadingText>
    );
  }

  // ─── 2. Not Authenticated ───
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // ─── 3. Profile Error ───
  if (profileError) {
    return (
      <ErrorText>
        {profileError.message || "Failed to load profile"}
      </ErrorText>
    );
  }

  // ─── 4. Missing Profile / Role ───
  const role = profile?.role_type;

  if (!role) {
    return <Navigate to={redirectTo} replace />;
  }

  // ─── 5. Role Check ───
  const requiredRoles = Array.isArray(roles) ? roles : [roles];

  if (!requiredRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // ─── 6. Access Granted ───
  return children ?? <Outlet />;
}
