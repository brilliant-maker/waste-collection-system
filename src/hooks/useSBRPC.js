import { useQueryClient } from '@tanstack/react-query';
import supabase from "../api/supabase.js";

export default function useSBRPC() {
  const queryClient = useQueryClient();

  const execute = async (fn, args = {}, options = {}) => {
    const key = options.key ?? fn;
    const clearPrevious = options.clearPrevious ?? false;

    const queryKey = ['rpc', key];

    if (clearPrevious) {
      queryClient.removeQueries({ queryKey });
    }

    return queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase.rpc(fn, args);
        if (error) throw error;
        return data;
      },
      gcTime: options.gcTime ?? 5 * 60 * 1000, // 5 minutes default
    });
  };

  const getState = (key) => {
    const state = queryClient.getQueryState(['rpc', key]);
    return {
      data: state?.data ?? null,
      isExecuting: state?.isFetching ?? false,
      error: state?.error?.message || null,
    };
  };

  const reexecute = (key) => 
    queryClient.refetchQueries({ queryKey: ['rpc', key] });

  const clearState = (key) => 
    queryClient.removeQueries({ queryKey: ['rpc', key] });

  return {
    execute,
    getState,
    reexecute,
    clearState,
  };
}
