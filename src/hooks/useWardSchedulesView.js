import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardSchedulesView() {
  
  const { profile } = useProfile();
  
  const isReady = !!profile;
  
  const wardId = profile?.ward_id ?? null;
  const profileId = profile?.profile_id ?? null;
  const roleType = profile?.role_type ?? null;
  
  const isWardSupervisor = roleType === "Ward Supervisor";
  const isWardDriver = roleType === "Ward Driver";

  let filters = [
    isWardSupervisor ?
    {
      column : "ward_supervisor_profile_id",
      operator : "eq",
      value: profileId
    } :
    isWardDriver ?
    {
      column : "ward_driver_profile_id",
      operator : "eq",
      value : profileId
    } :
    {
    column: "ward_id",
    operator: "eq",
    value: wardId
  }];
  
  const {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  } = useSBView({
    view: isReady ? "ward_schedules_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardSchedules: items || [],
    isWardSchedulesRetrieving: isReady ? isRetrieving : true,
    wardSchedulesRetrieveError: retrieveError,
    retrieveWardSchedules: retrieveItems
  };
}
