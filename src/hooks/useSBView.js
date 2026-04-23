import { useState, useEffect, useCallback } from "react";
import supabase from "../api/supabase.js";

export default function useSBView({
  view,
  retrieveFields = "*",
  filters = [],        // [{ column, operator = "eq", value }]
  orderBy = null,      // { column, ascending: true }
  limit = null         // number
}) {

  const [items, setItems] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [retrieveError, setRetrieveError] = useState(null);

  const fieldsKey = Array.isArray(retrieveFields)
    ? retrieveFields.join(",")
    : retrieveFields;

  const retrieveItems = useCallback(async () => {

    if (!view) return;

    setIsRetrieving(true);
    setRetrieveError(null);

    try {

      const selectFields = Array.isArray(retrieveFields)
        ? retrieveFields.join(", ")
        : retrieveFields;

      let query = supabase
        .from(view)
        .select(selectFields);

      // ─── Apply filters (.eq, .gt, etc.) ───
      filters.forEach(({ column, operator = "eq", value }) => {
        if (typeof query[operator] === "function") {
          query = query[operator](column, value);
        }
      });

      // ─── Apply ordering ───
      if (orderBy?.column) {
        query = query.order(orderBy.column, {
          ascending: orderBy.ascending ?? true
        });
      }

      // ─── Apply limit ───
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Simple overwrite (no realtime merging needed)
      setItems(data ?? []);

    } catch (err) {

      console.error(`Retrieve ${view} failed:`, err);
      setRetrieveError(err.message || `Failed to load ${view}`);

    } finally {

      setIsRetrieving(false);

    }

  }, [view, fieldsKey, JSON.stringify(filters), orderBy, limit]);

  useEffect(() => {
    retrieveItems();
  }, [retrieveItems]);

  return {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  };

}
