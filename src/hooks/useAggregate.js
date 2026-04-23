import { useMemo, useState, useCallback, useEffect } from "react";
import aggregateData from "../utils/aggregateData.js";

export default function useAggregate({
  data = {},
  aggregates: controlledAggregates, // external control
  initialAggregates = []            // fallback
}) {

  const isControlled = Array.isArray(controlledAggregates);

  const [internalAggregates, setInternalAggregates] = useState(initialAggregates);

  // Source of truth
  const aggregates = isControlled ? controlledAggregates : internalAggregates;

  // Sync internal state if controlled changes
  useEffect(() => {
    if (isControlled) {
      setInternalAggregates(controlledAggregates);
    }
  }, [controlledAggregates, isControlled]);

  // Apply aggregation
  const aggregatedData = useMemo(() => {
    return aggregateData({
      data,
      aggregates
    });
  }, [data, aggregates]);

  //  Only mutate if NOT controlled
  const upsertAggregate = useCallback((agg) => {
    if (isControlled) return;

    setInternalAggregates((prev) => {
      const exists = prev.find(
        a =>
          a.key === agg.key &&
          a.field === agg.field &&
          a.operator === agg.operator
      );

      if (!exists) return [...prev, agg];

      return prev.map(a =>
        a.key === agg.key &&
        a.field === agg.field &&
        a.operator === agg.operator
          ? { ...a, ...agg }
          : a
      );
    });
  }, [isControlled]);

  const removeAggregate = useCallback((key, field, operator) => {
    if (isControlled) return;

    setInternalAggregates((prev) =>
      prev.filter(
        a =>
          !(
            a.key === key &&
            a.field === field &&
            a.operator === operator
          )
      )
    );
  }, [isControlled]);

  const replaceAggregates = useCallback((newAggregates) => {
    if (isControlled) return;
    setInternalAggregates(newAggregates);
  }, [isControlled]);

  const resetAggregates = useCallback(() => {
    if (isControlled) return;
    setInternalAggregates(initialAggregates);
  }, [initialAggregates, isControlled]);

  return {
    aggregatedData,
    aggregates,

    setAggregates: isControlled ? undefined : setInternalAggregates,
    replaceAggregates,
    upsertAggregate,
    removeAggregate,
    resetAggregates
  };
}
