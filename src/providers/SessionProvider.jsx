import useSBSession from "../hooks/useSBSession.js";
import SessionContext from "../contexts/SessionContext.js";
import LoadingText from "../components/LoadingText.jsx";

export default function SessionProvider({ children }) {
  const session = useSBSession();
  return (
    <SessionContext.Provider value={session}>
      {session.isSessionLoading ? <LoadingText>Loading Session...</LoadingText> : children}
    </SessionContext.Provider>
  );
}
