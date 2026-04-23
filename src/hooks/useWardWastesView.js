import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardWastesView() {
  
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
    view: isReady ? "ward_wastes_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardWastes: items || [],
    isWardWastesRetrieving: isReady ? isRetrieving : true,
    wardWastesRetrieveError: retrieveError,
    retrieveWardWastes: retrieveItems
  };
}
