import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardScheduleZonesView() {
  
  const { profile } = useProfile();
  
  const isReady = !!profile;
  
  const wardId = profile?.ward_id ?? null;

  let filters = [{
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
    view: isReady ? "ward_schedule_zones_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardScheduleZones: items || [],
    isWardScheduleZonesRetrieving: isReady ? isRetrieving : true,
    wardScheduleZonesRetrieveError: retrieveError,
    retrieveWardScheduleZones: retrieveItems
  };
}
