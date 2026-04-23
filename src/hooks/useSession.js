import { useContext } from "react";
import SessionContext from "../contexts/SessionContext.js";

export default function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used inside a SessionProvider");
  }

  return context;
}
