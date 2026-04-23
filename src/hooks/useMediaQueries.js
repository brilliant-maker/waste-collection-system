import { useEffect, useState } from "react";

export default function useMediaQueries(queries) {
  const getMatches = () => {
    if (typeof window === "undefined") {
      // safer fallback
      return Object.fromEntries(
        Object.keys(queries).map((key) => [key, false])
      );
    }

    return Object.fromEntries(
      Object.entries(queries).map(([key, query]) => [
        key,
        window.matchMedia(query).matches,
      ])
    );
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqls = Object.entries(queries).map(([key, query]) => {
      const mql = window.matchMedia(query);

      const handler = (e) => {
        setMatches((prev) => ({
          ...prev,
          [key]: e.matches,
        }));
      };

      mql.addEventListener("change", handler);

      return { mql, handler };
    });

    setMatches(getMatches());

    return () => {
      mqls.forEach(({ mql, handler }) => {
        mql.removeEventListener("change", handler);
      });
    };
  }, [queries]);

  return matches;
}
