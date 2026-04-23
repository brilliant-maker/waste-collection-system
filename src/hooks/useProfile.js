import { useContext } from "react";
import ProfileContext from "../contexts/ProfileContext.js";

export default function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside a ProfileProvider");
  }

  return context;
}
