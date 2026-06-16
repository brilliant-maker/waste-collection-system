import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from "../api/supabase.js";

export default function useSBAuth({ confirmEmail = false } = {}) {

  const queryClient = useQueryClient();

  // ─── Sign Up Mutation ───
  const signUpMutation = useMutation({
    mutationFn: async ({ email, password, options = {} }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Robust guard fallback to force state refresh
      queryClient.invalidateQueries({ queryKey: ['supabase', 'session'] });
    },
  });

  // ─── Sign In Mutation ───
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Robust guard fallback to force state refresh
      queryClient.invalidateQueries({ queryKey: ['supabase', 'session'] });
    },
  });

  // ─── Sign Out Mutation ───
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      // Setting cache directly to null cleanly forces the UI logout 
      // without triggering an accidental, early re-fetch race condition.
      queryClient.setQueryData(['supabase', 'session'], null);
    },
  });

  // Convenience wrappers (React Compiler optimized using component-safe .mutate)
  const signUp = (payload) => signUpMutation.mutate(payload);
  const signIn = (payload) => signInMutation.mutate(payload);
  const signOut = () => signOutMutation.mutate();

  return {
    signUp,
    signIn,
    signOut,

    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    isSigningOut: signOutMutation.isPending,

    signUpError: signUpMutation.error?.message || null,
    signInError: signInMutation.error?.message || null,
    signOutError: signOutMutation.error?.message || null,

    // Exposed raw mutations so you can still use .mutateAsync() on demand!
    signUpMutation,
    signInMutation,
    signOutMutation,
  };
}
