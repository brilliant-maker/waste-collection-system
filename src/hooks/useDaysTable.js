import useSBTable from "./useSBTable.js";

export default function useDaysTable() {
  
  const {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  } = useSBTable({
    table: "days",
    pkField: "day_id",
    retrieveFields: "*",
    realtime: false
  });

  return {
    days: items || [],
    isDaysRetrieving: isRetrieving,
    daysRetrieveError: retrieveError,
    retrieveDays: retrieveItems
  };
}
