import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react";
import supabase from "../api/supabase.js";

export default function useSBSession() {
  const queryClient = useQueryClient();
  const queryKey = ['supabase', 'session'];

  // ─── Declarative Session Query ───
  const {
    data: session = null,
    isPending: isSessionLoading, // Modern v5 naming semantics
    error: queryError,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      // NOTE: For SSR apps (Next.js/Remix), replace getSession() with getUser()
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data?.session ?? null;
    },
    staleTime: Infinity, // The cache stays fresh forever because the listener updates it
    gcTime: Infinity,
  });

  // ─── Auth State Listener ───
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        // Handle all updates including SIGNED_IN, SIGNED_OUT, and TOKEN_REFRESHED
        queryClient.setQueryData(queryKey, newSession ?? null);
        
        // Optional: If you want to wipe all other cached data on sign out
        if (event === "SIGNED_OUT") {
          queryClient.clear(); 
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // ─── Derived State (No extra states/effects needed) ───
  const user = session?.user ?? null;
  const isAuthenticated = !!user;
  const sessionError = queryError ? (queryError.message || "Failed to load session") : null;

  // Manual imperative refetch trigger
  const retrieveSession = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  return {
    session,
    user,
    isAuthenticated,
    isSessionLoading,
    sessionError,
    retrieveSession,
  };
}
