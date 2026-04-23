import WardSchedulesAccordion from "./WardSchedulesAccordion.jsx";
import WardSchedulesCard from "./WardSchedulesCard.jsx";
import WardSchedulesModals from "./WardSchedulesModals.jsx";
import WardSchedulesCollectionsModals from "./WardSchedulesCollectionsModals.jsx";

export default function WardSchedulesMain({
  schedules,
  searchQuery,
  setSearchQuery,
  searchBy,
  setSearchBy,
  ...props
}
){
    
  const roleType = props.profile?.role_type;
  
  return (
    <>
      <WardSchedulesAccordion
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchBy={searchBy}
        setSearchBy={setSearchBy}/>
      <WardSchedulesCard
        roleType={roleType}
        currentDayName={props.currentDayName}
        dayName={props.selectedDay.dayName}
        wardSchedules={schedules}
        wardScheduleLoaders={props.wardScheduleLoaders}
        wardScheduleZones={props.wardScheduleZones}
        handleViewWardScheduleSupervisorClick={props.handleViewWardScheduleSupervisorClick}
        handleViewWardScheduleDriverClick={props.handleViewWardScheduleDriverClick}
        handleViewWardScheduleLoadersClick={props.handleViewWardScheduleLoadersClick}
        handleViewWardScheduleZonesClick={props.handleViewWardScheduleZonesClick}
        handleUpdateWardScheduleClick={props.handleUpdateWardScheduleClick}
        handleDeleteWardScheduleClick={props.handleDeleteWardScheduleClick}
        handleAddWardCollectionCompletedClick={props.handleAddWardCollectionCompletedClick}
        handleAddWardCollectionMissedClick={props.handleAddWardCollectionMissedClick}/>
        
      <WardSchedulesModals {...props} />
      
      <WardSchedulesCollectionsModals {...props} />
    </>
  );
}
