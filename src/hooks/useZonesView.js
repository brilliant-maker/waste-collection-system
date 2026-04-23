import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useZonesView() {
  
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
    view: isReady ? "zones_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    zones: items || [],
    isZonesRetrieving: isReady ? isRetrieving : true,
    zonesRetrieveError: retrieveError,
    retrieveZones: retrieveItems
  };
}
