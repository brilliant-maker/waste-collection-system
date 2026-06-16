import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from "../api/supabase.js";

export default function useSBTable({
  table,
  pkField = "id",
  retrieveFields = "*",
  filters = [],        // [{ column, operator = "eq", value }]
  orderBy = null,      // { column, ascending: true }
  limit = null,
}) {

  const queryClient = useQueryClient();

  // Stable query key
  const queryKey = [
    table,
    'list',
    retrieveFields,
    filters,
    orderBy,
    limit,
  ].filter(Boolean);

  // ─── Fetch items ───
  const {
    data: items = [],
    isLoading: isRetrieving,
    error: retrieveError,
    refetch: retrieveItems,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!table) return [];

      let query = supabase
        .from(table)
        .select(
          Array.isArray(retrieveFields)
            ? retrieveFields.join(", ")
            : retrieveFields
        );

      // Apply filters
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
    enabled: !!table,
  });

  // ─── Add mutation ───
  const addMutation = useMutation({
    mutationFn: async (fields) => {
      const { data, error } = await supabase
        .from(table)
        .insert([fields])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(queryKey, (old = []) => [...old, newItem]);
    },
  });

  // ─── Update mutation ───
  const updateMutation = useMutation({
    mutationFn: async ({ id, fields }) => {
      const { error } = await supabase
        .from(table)
        .update(fields)
        .eq(pkField, id);

      if (error) throw error;
      return { id, fields };
    },
    onSuccess: ({ id, fields }) => {
      queryClient.setQueryData(queryKey, (old = []) =>
        old.map((item) =>
          item[pkField] === id ? { ...item, ...fields } : item
        )
      );
    },
  });

  // ─── Delete mutation ───
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(pkField, id);

      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(queryKey, (old = []) =>
        old.filter((item) => item[pkField] !== id)
      );
    },
  });

  // Convenience wrappers (React Compiler will memoize these)
  const addItem = (fields) => addMutation.mutateAsync(fields);
  const updateItem = (id, fields) => updateMutation.mutateAsync({ id, fields });
  const deleteItem = (id) => deleteMutation.mutateAsync(id);

  return {
    table,
    items,
    queryKey,                    // ← Exposed for useSBRealtime

    setItems: (updater) => {
      queryClient.setQueryData(queryKey, typeof updater === 'function'
        ? updater(items)
        : updater
      );
    },

    isRetrieving,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    retrieveError: retrieveError?.message || null,
    addError: addMutation.error?.message || null,
    updateError: updateMutation.error?.message || null,
    deleteError: deleteMutation.error?.message || null,

    retrieveItems,
    addItem,
    updateItem,
    deleteItem,

    // Expose raw mutations for full control when needed
    addMutation,
    updateMutation,
    deleteMutation,
  };
}
