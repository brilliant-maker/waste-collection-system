import { useMemo, useState } from "react";

export default function useFilter(
  data,
  {
    queryFn,      // optional: text-based filtering
    conditionFn   // optional: state-based filtering
  } = {}
) {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    let result = [...data];

    // 1. Condition filter (ALWAYS runs if provided)
    if (typeof conditionFn === "function") {
      result = result.filter(item => conditionFn(item));
    }

    // 2. Query filter (only runs if query exists)
    if (query) {
      if (typeof queryFn === "function") {
        result = result.filter(item => queryFn(item, query));
      } else {
        const q = query.toLowerCase();

        result = result.filter(item =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(q)
          )
        );
      }
    }

    return result;
  }, [data, query, queryFn, conditionFn]);

  return {
    filterQuery: query,
    setFilterQuery: setQuery,
    filteredData
  };
}
