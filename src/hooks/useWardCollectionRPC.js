import useSBRPC from "./useSBRPC.js";

export default function useWardCollectionRPC() {
  const { execute, getState, reexecute, clearState } = useSBRPC();
  
  const addWardCollection = async (wardCollectionPayload) => {
    return execute(
      "add_ward_collection",
      {payload : wardCollectionPayload},
      {key : "addWardCollection"}
    );
  };
  
  return {
    addWardCollection,
    getState,
    reexecute,
    clearState
  };
}
