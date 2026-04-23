import { NavLink } from "react-router";
import LoadingText from "../components/LoadingText.jsx";
import ErrorText from "../components/ErrorText.jsx";
import Button from "../components/Button.jsx";
import useProfile from "../hooks/useProfile.js";
import useDevice from "../hooks/useDevice.js";
import useSidebar from "../hooks/useSidebar.js";
import "../styles/Link.css";

export default function ProtectedLinks () {
  const { profile } = useProfile();
  const { isMobile } = useDevice();
  const { closeSidebar } = useSidebar();
  
  const roleType = profile?.role_type ?? "Guest";
  
  const isWardSupervisor = roleType === "Ward Supervisor";
  
  return (
    <>
      <NavLink
        onClick={isMobile ? closeSidebar : () => {}}
        to="/ward_schedules"
        className={({ isActive }) => ( `link ${isActive ? "link-active" : ""}`)}>
        Schedules
      </NavLink>
      {isWardSupervisor && (
       <NavLink
        onClick={isMobile ? closeSidebar : () => {}}
        to="/ward_collections"
        className={({ isActive }) => ( `link ${isActive ? "link-active" : ""}`)}>
        Collections
      </NavLink>)}
    </>
  );
}
