import useSBView from "./useSBView.js";
import useProfile from "./useProfile.js";

export default function useWardLoadersView() {
  
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
    view: isReady ? "ward_loaders_view" : null,
    retrieveFields: "*",
    filters
  });

  return {
    wardLoaders: items || [],
    isWardLoadersRetrieving: isReady ? isRetrieving : true,
    wardLoadersRetrieveError: retrieveError,
    retrieveWardLoaders: retrieveItems
  };
}
