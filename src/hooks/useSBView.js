import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import supabase from "../api/supabase.js";

export default function useSBView({
  view,
  retrieveFields = "*",
  filters = [],        // [{ column, operator = "eq", value }]
  orderBy = null,      // { column, ascending: true }
  limit = null,
}) {

  // 1. Memoize serialized complex inputs to completely protect the TanStack queryKey
  const serializedFilters = useMemo(() => {
    return JSON.stringify(filters);
  }, [filters]);

  const serializedOrderBy = useMemo(() => {
    return orderBy ? JSON.stringify(orderBy) : '';
  }, [orderBy]);

  const fieldsString = useMemo(() => {
    return Array.isArray(retrieveFields) ? retrieveFields.join(",") : retrieveFields;
  }, [retrieveFields]);

  // 2. Memoize the queryKey structure itself so its array reference remains stable
  const queryKey = useMemo(() => {
    return [
      'supabase_view',
      view,
      fieldsString,
      serializedFilters,
      serializedOrderBy,
      limit,
    ].filter(Boolean);
  }, [view, fieldsString, serializedFilters, serializedOrderBy, limit]);

  // ─── Fetch view data ───
  const {
    data: items = [],
    isLoading: isRetrieving,
    error: retrieveError,
    refetch: retrieveItems,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!view) return [];

      let query = supabase
        .from(view)
        .select(fieldsString);

      // Apply filters safely
      filters.forEach(({ column, operator = "eq", value }) => {
        if (typeof query[operator] === "function") {
          query = query[operator](column, value);
        }
      });

      // Apply ordering
      if (orderBy?.column) {
        query = query.order(orderBy.column, {
          ascending: orderBy.ascending ?? true,
        });
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!view,
  });

  return {
    items,
    queryKey, // Safely exposed memoized key for manual invalidation or realtime synchronization
    isRetrieving,
    retrieveError: retrieveError?.message || null,
    retrieveItems,
  };
}
