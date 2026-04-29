import { useState, useEffect, useCallback, useRef } from "react";
import useSession from "./useSession.js";
import supabase from "../api/supabase.js";

export default function useSBProfile() {
  const { user } = useSession();

  const lastUserIdRef = useRef(null);

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

      setProfile(prev =>
        JSON.stringify(prev) === JSON.stringify(data) ? prev : data
      );

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

  // ─── Fetch only when user ID changes ───
  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      setIsProfileLoading(false);
      return;
    }

    if (lastUserIdRef.current === user.id) return;

    lastUserIdRef.current = user.id;

    retrieveProfile();

  }, [user?.id, retrieveProfile]);

  return {
    profile,
    isProfileLoading,
    profileError,
    retrieveProfile
  };
}
