import useSBProfile from "../hooks/useSBProfile.js";
import ProfileContext from "../contexts/ProfileContext.js";

export default function ProfileProvider({ children }) {
  
  const profile = useSBProfile();
  
  return (
    <ProfileContext.Provider
      value={profile}
    >
      {children}
    </ProfileContext.Provider>
  );
}
