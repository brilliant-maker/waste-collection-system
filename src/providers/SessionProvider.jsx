import useSBSession from "../hooks/useSBSession.js";
import SessionContext from "../contexts/SessionContext.js";

export default function SessionProvider({ children }) {
  const session = useSBSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
