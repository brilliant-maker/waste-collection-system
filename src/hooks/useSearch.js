import { useMemo, useState } from "react";

export default function useSearch(data, searchFn) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!Array.isArray(data)) return [];

    // if no query, return original data
    if (!query) return data;

    // if custom search function is provided, use it
    if (typeof searchFn === "function") {
      return data.filter(item => searchFn(item, query));
    }

    // default behavior (basic string match fallback)
    const q = query.toLowerCase();

    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [data, query, searchFn]);

  return {
    searchQuery: query,
    setSearchQuery: setQuery,
    searchedData: results
  };
}
