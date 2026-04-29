import { useState, useEffect, useCallback, useRef } from "react";
import supabase from "../api/supabase.js";

export default function useSBSession() {
  const mountedRef = useRef(false);
  const lastRefreshRef = useRef(0); // throttle refresh

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  // ─── Retrieve Session ───
  const retrieveSession = useCallback(async () => {
    try {
      setSessionError(null);

      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!mountedRef.current) return;

      const newSession = data?.session ?? null;

      setSession(prev =>
        prev?.access_token === newSession?.access_token ? prev : newSession
      );

      setUser(prev =>
        prev?.id === newSession?.user?.id
          ? prev
          : newSession?.user ?? null
      );

    } catch (err) {
      console.error("Session retrieval failed:", err);
      if (mountedRef.current) {
        setSessionError(err.message || "Failed to load session");
      }
    }
  }, []);

  // ─── SAFE Refresh (throttled) ───
  const refreshSession = useCallback(async () => {
    const now = Date.now();

    // ⛔ Prevent spamming → avoids 429
    if (now - lastRefreshRef.current < 60000) return;

    lastRefreshRef.current = now;

    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;

      if (!mountedRef.current) return;

      const newSession = data?.session ?? null;

      setSession(newSession);
      setUser(newSession?.user ?? null);

    } catch (err) {
      if (mountedRef.current) {
        setSessionError(err.message || "Failed to refresh session");
      }
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

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mountedRef.current) return;

      setSession(prev =>
        prev?.access_token === newSession?.access_token
          ? prev
          : newSession
      );

      setUser(prev =>
        prev?.id === newSession?.user?.id
          ? prev
          : newSession?.user ?? null
      );

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
    refreshSession // safe but optional
  };
}
