import { useEffect, useRef, useState } from "react";
import supabase from "../api/supabase.js";

export default function useSBRealtime({
  crud,
  pkField = "id",
  schema = "public",
  events = ["INSERT", "UPDATE", "DELETE"],
  filter = null,
}) {

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);

  const channelRef = useRef(null);

  const table = crud?.table;
  const setItems = crud?.setItems;

  const eventsKey = Array.isArray(events) ? events.join(",") : events;

  useEffect(() => {

    if (!table || typeof setItems !== "function") {
      setSubscribeError("Realtime: crud instance not ready or invalid");
      return;
    }

    // cleanup previous
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase
      .channel(`realtime:${schema}:${table}`)
      .on(
        "postgres_changes",
        {
          event: events.length === 1 ? events[0] : "*",
          schema,
          table,
        },
        (payload) => {

          if (filter && !filter(payload)) return;

          const { eventType, new: newRow = {}, old: oldRow = {} } = payload;

          setItems((prev = []) => {

            const pk = newRow?.[pkField] ?? oldRow?.[pkField];
            if (!pk) return prev;

            const index = prev.findIndex(
              (item) => item?.[pkField] === pk
            );

            switch (eventType) {

              case "INSERT": {

                if (index !== -1) return prev;

                return [...prev, newRow];
              }

              case "UPDATE": {

                if (index === -1) {
                  // item not yet loaded
                  return [...prev, newRow];
                }

                const updated = [...prev];
                updated[index] = { ...updated[index], ...newRow };
                return updated;
              }

              case "DELETE": {

                if (index === -1) return prev;

                const updated = [...prev];
                updated.splice(index, 1);
                return updated;
              }

              default:
                return prev;
            }

          });

        }
      )
      .subscribe((status) => {

        if (status === "SUBSCRIBED") {
          setIsSubscribed(true);
          setSubscribeError(null);
        }

        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setIsSubscribed(false);
          setSubscribeError(`Realtime failed: ${status}`);
        }

      });

    channelRef.current = channel;

    return () => {

      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }

      setIsSubscribed(false);

    };

  }, [table, pkField, schema, eventsKey, filter]);

  return {
    isSubscribed,
    subscribeError,
  };

}
