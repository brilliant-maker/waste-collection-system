import { NavLink } from "react-router";

export default function PublicLinks () {
  return (
    <NavLink
      to="/signin"
      className={({ isActive }) => (isActive ? "active" : "")}
      >
      Sign In
    </NavLink>
  );
}
