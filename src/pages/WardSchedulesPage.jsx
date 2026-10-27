import { useState } from "react";
import Center from "../components/Center.jsx";
import LoadingText from "../components/LoadingText.jsx";
import ErrorText from "../components/ErrorText.jsx";
import WardSchedulesHeader from "../components/WardSchedulesHeader.jsx";
import WardSchedulesMain from "../components/WardSchedulesMain.jsx";
import WardSchedulesCollectionsFooter from "../components/WardSchedulesCollectionsFooter.jsx";
import useWardSchedulesPage from "../hooks/useWardSchedulesPage.js";
import useSearch from "../hooks/useSearch.js";
import useFilter from "../hooks/useFilter.js";
import useSort from "../hooks/useSort.js";
import usePaginate from "../hooks/usePaginate.js";

export default function WardSchedulesPage() {

  const [searchBy, setSearchBy] = useState("shift_type");

  const hook = useWardSchedulesPage();

  const { searchQuery, setSearchQuery, searchedData } = useSearch(hook?.wardSchedules ?? [], (item, query) => String(item[searchBy])
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const { filteredData } = useFilter(searchedData, {
      conditionFn: (schedule) =>
      schedule.day_name === hook?.selectedDay.dayName
  });

  const { sortedData } = useSort(
  filteredData,
  (a, b, { sortDirection }) => {
    const aLen = a.starts_at?.length || 0;
    const bLen = b.starts_at?.length || 0;

    const diff = aLen - bLen;
    return sortDirection === "asc" ? diff : -diff;
  }
  );

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
  const roleType = hook.profile?.role_type;

  const isWardSupervisor = roleType === "Ward Supervisor";

  return (
    <>
      <WardSchedulesHeader
        wardName={wardName}
        isWardSupervisor={isWardSupervisor}
        handleAddWardScheduleClick={hook.handleAddWardScheduleClick}
        handleSelectWardScheduleDayClick={hook.handleSelectWardScheduleDayClick} />

      <WardSchedulesMain
        schedules={paginatedData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
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
