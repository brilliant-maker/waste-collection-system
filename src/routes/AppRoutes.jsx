import { Routes, Route, Navigate } from "react-router";
import PublicRoutes from "./PublicRoutes.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import useSession from "../hooks/useSession.js";

export default function AppRoutes() {
  const { isAuthenticated } = useSession();
  
  return (
    <Routes>
      {isAuthenticated ? ProtectedRoutes : PublicRoutes}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/ward_schedules" : "/signin"}
            replace
          />
        }
      />
    </Routes>
  );
}
