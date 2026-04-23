import useSBRPC from "./useSBRPC.js";

export default function useWardScheduleRPC() {
  const { execute, getState, reexecute, clearState } = useSBRPC();
  
  const addWardSchedule = async (wardSchedulePayload) => {
    return execute(
      "add_ward_schedule",
      {payload : wardSchedulePayload},
      {key : "addWardSchedule"}
    );
  };
  
  const updateWardSchedule = async (wardSchedulePayload) => {
    return execute(
      "update_ward_schedule",
      {payload : wardSchedulePayload},
      {key : "updateWardSchedule"}
    );
  };
  
  const deleteWardSchedule = async (wardScheduleId) => {
    return execute(
      "delete_ward_schedule",
      {p_ward_schedule_id : wardScheduleId},
      {key : "deleteWardSchedule"}
    );
  };

  return {
    addWardSchedule,
    updateWardSchedule,
    deleteWardSchedule,
    getState,
    reexecute,
    clearState
  };
}
