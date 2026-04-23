import { useState, useCallback, useRef } from "react";
import supabase from "../api/supabase.js";

export default function useSBRPC() {

  const [rpcStates, setRpcStates] = useState({});

  const lastArgsRef = useRef({});
  const requestIdsRef = useRef({});

  const execute = useCallback(async (fn, args = {}, options = {}) => {

    const key = options.key ?? fn;
    const clearPrevious = options.clearPrevious ?? false;

    if (clearPrevious) {
      setRpcStates((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }

    lastArgsRef.current[key] = { fn, args, options };

    const requestId = (requestIdsRef.current[key] ?? 0) + 1;
    requestIdsRef.current[key] = requestId;

    setRpcStates((prev) => ({
      ...prev,
      [key]: {
        data: prev[key]?.data ?? null,
        isExecuting: true,
        error: null,
      },
    }));

    try {

      const { data, error } = await supabase.rpc(fn, args);
      if (error) throw error;

      // Prevent stale responses
      if (requestIdsRef.current[key] !== requestId) return data;

      setRpcStates((prev) => ({
        ...prev,
        [key]: {
          data,
          isExecuting: false,
          error: null,
        },
      }));

      return data;

    } catch (err) {

      console.error(`RPC ${fn} (key: ${key}) failed:`, err);
      const message = err.message || `Failed to execute ${fn}`;

      setRpcStates((prev) => ({
        ...prev,
        [key]: {
          data: prev[key]?.data ?? null,
          isExecuting: false,
          error: message,
        },
      }));

      throw new Error(message);

    }

  }, []);

  const getState = useCallback(
    (key) =>
      rpcStates[key] ?? { data: null, isExecuting: false, error: null },
    [rpcStates]
  );

  const reexecute = useCallback((key) => {

    const last = lastArgsRef.current[key];

    if (!last) {
      console.warn(`No previous execution for key "${key}"`);
      return Promise.resolve(null);
    }

    return execute(last.fn, last.args, last.options);

  }, [execute]);

  const clearState = useCallback((key) => {

    setRpcStates((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  }, []);

  return {
    execute,
    getState,
    reexecute,
    clearState,
  };

}
