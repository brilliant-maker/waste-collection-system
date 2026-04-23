import { Route, Navigate } from "react-router";
import RoleGate from "../gates/RoleGate.jsx";
import WardSchedulesPage from "../pages/WardSchedulesPage.jsx";
import WardCollectionsPage from "../pages/WardCollectionsPage.jsx";
import UnauthorizedPage from "../pages/UnauthorizedPage.jsx";

const ProtectedRoutes = (
  <>
    <Route
      index
      element={<Navigate to="/ward_schedules" replace />} />

    <Route
      element={
        <RoleGate
          roles={["Ward Supervisor","Ward Driver","Ward Loader"]} />}>
      <Route
        path="/ward_schedules"
        element={<WardSchedulesPage />} />
    </Route>
    
    <Route
      element={
        <RoleGate
          roles={["Ward Supervisor"]} />}>
      <Route
        path="/ward_collections"
        element={<WardCollectionsPage />} />
    </Route>
    
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
  </>
);

export default ProtectedRoutes;
