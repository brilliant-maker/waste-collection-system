import { useState, useEffect, useCallback } from "react";
import useSession from "./useSession.js";
import supabase from "../api/supabase.js";

export default function useSBProfile() {
  const { user } = useSession();
  
  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const retrieveProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsProfileLoading(false);
      return null;
    }

    try {
      setIsProfileLoading(true);
      setProfileError(null);

      const { data, error } = await supabase
        .from("profiles_view")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      const retrievedProfile = data;
      setProfile(retrievedProfile);

      return retrievedProfile;
    } catch (err) {
      console.error("Error retrieving profile:", err.message);
      setProfileError(err);
      setProfile(null);
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, [user]);

  useEffect(() => {
    retrieveProfile();
  }, [retrieveProfile]);
  
  return {
    profile,
    isProfileLoading,
    profileError,
    retrieveProfile
  }
}
