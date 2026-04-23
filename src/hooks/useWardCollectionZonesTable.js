import useSBTable from "./useSBTable.js";
import useProfile from "./useProfile.js";

export default function useWardCollectionZonesTable() {
  
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
  } = useSBTable({
    table: isReady ? "ward_collection_zones" : null,
    pkField: "ward_collection_zone_id",
    retrieveFields: "*",
    filters
  });

  return {
    wardCollectionZones: items || [],
    isWardCollectionZonesRetrieving: isReady ? isRetrieving : true,
    wardCollectionZonesRetrieveError: retrieveError,
    retrieveWardCollectionZones: retrieveItems
  };
}
