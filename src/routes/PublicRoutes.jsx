import { Route, Navigate } from "react-router";
import SignInPage from "../pages/SignInPage.jsx";

const PublicRoutes = (
  <>
    <Route index element={<Navigate to="/signin" replace />} />
    <Route path="/signin" element={<SignInPage />} />
  </>
);

export default PublicRoutes;

