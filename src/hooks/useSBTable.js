import { useState, useEffect, useCallback } from "react";
import supabase from "../api/supabase.js";

export default function useSBTable({
  table,
  pkField = "id",
  retrieveFields = "*",
  filters = [],        // [{ column, operator = "eq", value }]
  orderBy = null,      // { column, ascending: true }
  limit = null,   
  realtime = false,
}) {

  const [items, setItems] = useState([]);

  const [isRetrieving, setIsRetrieving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [retrieveError, setRetrieveError] = useState(null);
  const [addError, setAddError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // ─── Stabilize retrieveFields dependency ───
  const fieldsKey = Array.isArray(retrieveFields)
    ? retrieveFields.join(",")
    : retrieveFields;

  // ─── Fetch items ───
  const retrieveItems = useCallback(async () => {

    if (!table) return;
    if (!Array.isArray(filters)) return;

    setIsRetrieving(true);
    setRetrieveError(null);

    try {

      const selectFields = Array.isArray(retrieveFields)
        ? retrieveFields.join(", ")
        : retrieveFields;

      let query = supabase
        .from(table)
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

      // Merge instead of overwrite (prevents realtime race bug)
      setItems((prev = []) => {

        const map = new Map();

        prev.forEach((item) => {
          map.set(item[pkField], item);
        });

        (data ?? []).forEach((item) => {
          map.set(item[pkField], item);
        });

        return Array.from(map.values());

      });

    } catch (err) {

      console.error(`Retrieve ${table} failed:`, err);
      setRetrieveError(err.message || `Failed to load ${table}`);

    } finally {

      setIsRetrieving(false);

    }

  }, [table, fieldsKey, pkField, JSON.stringify(filters), orderBy, limit]);

  useEffect(() => {
    retrieveItems();
  }, [retrieveItems]);

  // ─── Add ───
  const addItem = async (fields) => {

    setIsAdding(true);
    setAddError(null);

    try {

      const { data, error } = await supabase
        .from(table)
        .insert([fields])
        .select()
        .single();

      if (error) throw error;

      if (!realtime && data) {
        setItems((prev = []) => [...prev, data]);
      }

    } catch (err) {

      console.error(`Add to ${table} failed:`, err);
      setAddError(err.message || `Failed to add item`);

    } finally {

      setIsAdding(false);

    }

  };

  // ─── Update ───
  const updateItem = async (id, fields) => {

    setIsUpdating(true);
    setUpdateError(null);

    try {

      const { error } = await supabase
        .from(table)
        .update(fields)
        .eq(pkField, id);

      if (error) throw error;

      if (!realtime) {

        setItems((prev = []) =>
          prev.map((item) =>
            item[pkField] === id ? { ...item, ...fields } : item
          )
        );

      }

    } catch (err) {

      console.error(`Update ${table} failed:`, err);
      setUpdateError(err.message || `Failed to update item`);

    } finally {

      setIsUpdating(false);

    }

  };

  // ─── Delete ───
  const deleteItem = async (id) => {

    setIsDeleting(true);
    setDeleteError(null);

    try {

      const { error } = await supabase
        .from(table)
        .delete()
        .eq(pkField, id);

      if (error) throw error;

      if (!realtime) {

        setItems((prev = []) =>
          prev.filter((item) => item[pkField] !== id)
        );

      }

    } catch (err) {

      console.error(`Delete from ${table} failed:`, err);
      setDeleteError(err.message || `Failed to delete item`);

    } finally {

      setIsDeleting(false);

    }

  };

  return {
    table,
    items,
    setItems,

    isRetrieving,
    isAdding,
    isUpdating,
    isDeleting,

    retrieveError,
    addError,
    updateError,
    deleteError,

    retrieveItems,
    addItem,
    updateItem,
    deleteItem,
  };

}
