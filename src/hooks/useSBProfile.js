import { useQuery } from '@tanstack/react-query';
import useSession from "./useSession.js";
import supabase from "../api/supabase.js";

export default function useSBProfile() {
  const { user } = useSession();

  const {
    data: profile = null,
    isLoading: isProfileLoading,
    error: queryError,
    refetch: retrieveProfile,
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("profiles_view")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  return {
    profile,
    isProfileLoading,
    profileError: queryError?.message || queryError || null,
    retrieveProfile,
  };
}
