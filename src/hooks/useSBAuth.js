import { useState, useCallback } from "react";
import supabase from "../api/supabase.js";

export default function useSBAuth({ confirmEmail = false } = {}) {

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const [signUpError, setSignUpError] = useState(null);
  const [signInError, setSignInError] = useState(null);
  const [signOutError, setSignOutError] = useState(null);

  // ─── Sign Up ───
  const signUp = useCallback(async ({ email, password, options = {} }) => {

    setIsSigningUp(true);
    setSignUpError(null);

    try {

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      if (error) throw error;

      return data;

    } catch (err) {

      setSignUpError(err.message || "Sign up failed");
      throw err;

    } finally {

      setIsSigningUp(false);

    }

  }, [confirmEmail]);

  // ─── Sign In ───
  const signIn = useCallback(async ({ email, password }) => {

    setIsSigningIn(true);
    setSignInError(null);

    try {

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;

      return data;

    } catch (err) {

      setSignInError(err.message || "Sign in failed");
      throw err;

    } finally {

      setIsSigningIn(false);

    }

  }, []);

  // ─── Sign Out ───
  const signOut = useCallback(async () => {

    setIsSigningOut(true);
    setSignOutError(null);

    try {

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

    } catch (err) {

      setSignOutError(err.message || "Sign out failed");
      throw err;

    } finally {

      setIsSigningOut(false);

    }

  }, []);

  return {

    signUp,
    signIn,
    signOut,

    isSigningUp,
    isSigningIn,
    isSigningOut,

    signUpError,
    signInError,
    signOutError

  };

}
