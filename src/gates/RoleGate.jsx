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

  const { isAuthenticated } = useSession();

  const { profile, isProfileLoading, profileError } = useProfile();
  
  const isReady = !!isAuthenticated && !!profile;
  
  const role = profile?.role_type ?? null;

  if (isProfileLoading || !isReady) {

    if (!showLoading) return null;

    return (
      <LoadingText>
        Loading Profile...
      </LoadingText>
    );
  }

  if (isReady && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (isReady && profileError) {
    return (
      <ErrorText>
        {profileError}
      </ErrorText>
    );
  }

  if (isReady && !role) {
    return <Navigate to={redirectTo} replace />;
  }

  const requiredRoles = Array.isArray(roles) ? roles : [roles];

  const hasAccess = requiredRoles.includes(role);

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ?? <Outlet />;
}
