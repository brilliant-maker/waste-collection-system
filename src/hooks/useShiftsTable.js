import useSBTable from "./useSBTable.js";

export default function useShiftsTable() {
  
  const {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  } = useSBTable({
    table: "shifts",
    pkField: "shift_id",
    retrieveFields: "*",
    realtime: false
  });

  return {
    shifts: items || [],
    isShiftsRetrieving: isRetrieving,
    shiftsRetrieveError: retrieveError,
    retrieveShifts: retrieveItems
  };
}
