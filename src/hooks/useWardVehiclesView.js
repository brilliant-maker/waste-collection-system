import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardVehiclesView() {
  
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
    view: isReady ? "ward_vehicles_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardVehicles: items || [],
    isWardVehiclesRetrieving: isReady ? isRetrieving : true,
    wardVehiclesRetrieveError: retrieveError,
    retrieveWardVehicles: retrieveItems
  };
}
