import WardCollectionsAccordions from "./WardCollectionsAccordions.jsx";
import WardCollectionsCard from "./WardCollectionsCard.jsx";
import WardSchedulesCollectionsModals from "./WardSchedulesCollectionsModals.jsx";

export default function WardCollectionsMain({
  collections,
  searchQuery,
  setSearchQuery,
  searchBy,
  setSearchBy,
  filterQuery,
  setFilterQuery,
  filterBy,
  setFilterBy,
  sortKey,
  setSortKey,
  sortDirection,
  setSortDirection,
  sortBy,
  setSortBy,
  ...props
}){
  
  const roleType = props.profile?.role_type;

  return (
    <>
      <WardCollectionsAccordions
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortBy={sortBy}
        setSortBy={setSortBy}/>
        
      <WardCollectionsCard
        roleType={roleType}
        currentMonthName={props.currentMonthName}
        currentYear={props.currentYear}
        wardCollections={collections}
        wardCollectionLoaders={props.wardCollectionLoaders}
        wardCollectionZones={props.wardCollectionZones}
        handleViewWardCollectionDriverClick={props.handleViewWardCollectionDriverClick}
        handleViewWardCollectionLoadersClick={props.handleViewWardCollectionLoadersClick}
        handleViewWardCollectionZonesClick={props.handleViewWardCollectionZonesClick}/>
      <WardSchedulesCollectionsModals {...props} />
    </>
  );
}
