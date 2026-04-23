import { useMemo, useState } from "react";

function normalize(value) {
  if (value == null) return null;

  if (value instanceof Date) return value.getTime();

  if (typeof value === "string") return value.toLowerCase();

  if (typeof value === "number") return value;

  const date = new Date(value);
  if (!isNaN(date.getTime())) return date.getTime();

  return value;
}

export default function useSort(data, sortFn) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const copy = [...data];

    // no sorting applied
    if (!sortKey && typeof sortFn !== "function") return copy;

    return copy.sort((a, b) => {
      //  Custom sortFn (highest priority)
      if (typeof sortFn === "function") {
        return sortFn(a, b, { sortKey, sortDirection });
      }

      // Default sort behavior
      const aVal = normalize(a?.[sortKey]);
      const bVal = normalize(b?.[sortKey]);

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortKey, sortDirection, sortFn]);

  return {
    sortedData,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection
  };
}
