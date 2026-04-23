import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardDriversView() {
  
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
    view: isReady ? "ward_drivers_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardDrivers: items || [],
    isWardDriversRetrieving: isReady ? isRetrieving : true,
    wardDriversRetrieveError: retrieveError,
    retrieveWardDrivers: retrieveItems
  };
}
