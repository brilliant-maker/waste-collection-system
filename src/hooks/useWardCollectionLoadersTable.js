import useSBTable from "./useSBTable.js";
import useProfile from "./useProfile.js";

export default function useWardCollectionLoadersTable() {
  
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
  } = useSBTable({
    table: isReady ? "ward_collection_loaders" : null,
    pkField: "ward_collection_loader_id",
    retrieveFields: "*",
    filters
  });

  return {
    wardCollectionLoaders: items || [],
    isWardCollectionLoadersRetrieving: isReady ? isRetrieving : true,
    wardCollectionLoadersRetrieveError: retrieveError,
    retrieveWardCollectionLoaders: retrieveItems
  };
}
