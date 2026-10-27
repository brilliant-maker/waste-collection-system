import { useState } from "react";
import Center from "../components/Center.jsx";
import LoadingText from "../components/LoadingText.jsx";
import ErrorText from "../components/ErrorText.jsx";
import WardCollectionsHeader from "../components/WardCollectionsHeader.jsx";
import WardCollectionsMain from "../components/WardCollectionsMain.jsx";
import WardSchedulesCollectionsFooter from "../components/WardSchedulesCollectionsFooter.jsx";
import useWardCollectionsPage from "../hooks/useWardCollectionsPage.js";
import useSearch from "../hooks/useSearch.js";
import useFilter from "../hooks/useFilter.js";
import useSort from "../hooks/useSort.js";
import usePaginate from "../hooks/usePaginate.js";

export default function WardCollectionsPage() {

  const [searchBy, setSearchBy] = useState("shift_type");
  const [filterBy, setFilterBy] = useState("month_name");
  const [sortBy, setSortBy] = useState("starts_at");

  const hook = useWardCollectionsPage();

  const {
    searchQuery,
    setSearchQuery,
    searchedData } = useSearch(hook?.wardCollections ?? [], (item, query) =>
    String(item[searchBy])
    .toLowerCase()
    .includes(query.toLowerCase())
  );

  const {
    filterQuery,
    setFilterQuery,
    filteredData } = useFilter(searchedData,{
          queryFn: (item, query) =>
          String(item[filterBy])
          .toLowerCase() === query.toLowerCase()
  });

  const {
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    sortedData } = useSort(filteredData, (a, b, { sortDirection }) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const {
    currentPage,
    pages,
    hasNext,
    hasPrev,
    setPage,
    nextPage,
    prevPage,
    paginatedData
  } = usePaginate(sortedData, 2);


  if (hook.isLoading) {
    
    return (
      <Center>
        <LoadingText>
          Loading...
        </LoadingText>
      </Center>
    );
    
  }

  if (hook.error) {
    
    return (
      <Center>
        <ErrorText>
          Error: {hook.error}
        </ErrorText>
      </Center>
    );
    
  }

  const wardName = hook.profile?.ward_name;

  return (
    <>
      <WardCollectionsHeader
        wardName={wardName}/>

      <WardCollectionsMain
        collections={paginatedData}
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
        setSortBy={setSortBy}
        {...hook} />

        <WardSchedulesCollectionsFooter
          currentPage={currentPage}
          pages={pages}
          hasNext={hasNext}
          hasPrev={hasPrev}
          setPage={setPage}
          nextPage={nextPage}
          prevPage={prevPage}/>
    </>
  );
}
