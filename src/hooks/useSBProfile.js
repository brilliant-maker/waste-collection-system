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
        .maybeSingle();

      if (error) throw error;

      setProfile(data ?? null);

      return data;

    } catch (err) {
      console.error("Error retrieving profile:", err.message);

      setProfileError(err);
      setProfile(null);

      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, [user]);

  // ✅ ALWAYS run when user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setIsProfileLoading(false);
      return;
    }

    retrieveProfile();
  }, [user, retrieveProfile]);

  return {
    profile,
    isProfileLoading,
    profileError,
    retrieveProfile
  };
}
