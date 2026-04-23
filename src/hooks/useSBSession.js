import { useState, useEffect, useCallback, useRef } from "react";
import supabase from "../api/supabase.js";

export default function useSBSession() {

  const mountedRef = useRef(true);

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  // ─── Retrieve Session ───
  const retrieveSession = useCallback(async () => {

    try {

      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!mountedRef.current) return;

      setSession(data?.session ?? null);
      setUser(data.session?.user ?? null);

    } catch (err) {

      console.error("Session retrieval failed:", err);
      setSessionError(err.message || "Failed to load session");

    }

  }, []);

  // ─── Refresh Session ───
  const refreshSession = useCallback(async () => {

    try {

      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      if (!mountedRef.current) return;

      setSession(data?.session);
      setUser(data.session?.user ?? null);

    } catch (err) {

      setSessionError(err.message || "Failed to refresh session");

    }

  }, []);

  // ─── Initialize ───
  useEffect(() => {

    mountedRef.current = true;

    const init = async () => {
      await retrieveSession();
      if (mountedRef.current) {
        setIsSessionLoading(false);
      }
    };

    init();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, newSession) => {

        if (!mountedRef.current) return;

        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsSessionLoading(false);

      });

    return () => {
      mountedRef.current = false;
      subscription.unsubscribe();
    };

  }, [retrieveSession]);

  const isAuthenticated = !!user;

  return {

    session,
    user,

    isAuthenticated,
    isSessionLoading,

    sessionError,

    retrieveSession,
    refreshSession

  };

}
