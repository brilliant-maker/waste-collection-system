import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardScheduleLoadersView() {
  
  const { profile } = useProfile();
  
  const isReady = !!profile;
  
  const wardId = profile?.ward_id ?? null;
  const profileId = profile?.profile_id ?? null;
  const roleType = profile?.role_type ?? null;
  
  const isWardLoader = roleType === "Ward Loader";

  let filters = [
    isWardLoader ?
    {
      column : "ward_loader_profile_id",
      operator : "eq",
      value: profileId
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
    view: isReady ? "ward_schedule_loaders_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardScheduleLoaders: items || [],
    isWardScheduleLoadersRetrieving: isReady ? isRetrieving : true,
    wardScheduleLoadersRetrieveError: retrieveError,
    retrieveWardScheduleLoaders: retrieveItems
  };
}
