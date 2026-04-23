import SelectWardScheduleDayModal from "./SelectWardScheduleDayModal.jsx";
import AddUpdateWardScheduleModal from "./AddUpdateWardScheduleModal.jsx";
import DeleteWardScheduleModal from "./DeleteWardScheduleModal.jsx";
import AddWardCollectionModal from "./AddWardCollectionModal.jsx";

export default function WardSchedulesModals(props) {
  
  const profileId = props.profile?.profile_id;
  const wardId = props.profile?.ward_id;
  
  return (
    <>
      <SelectWardScheduleDayModal
        selectedDay={props.selectedDay}
        setSelectedDay={props.setSelectedDay}
        isSelectWardScheduleDayModalOpen={props.isSelectWardScheduleDayModalOpen}
        onSelectWardScheduleDayModalClose={props.onSelectWardScheduleDayModalClose}/>
      <AddUpdateWardScheduleModal
        retrieveWardSchedules={props.retrieveWardSchedules}
        retrieveWardScheduleLoaders={props.retrieveWardScheduleLoaders}
        retrieveWardScheduleZones={props.retrieveWardScheduleZones}
        wardScheduleId={props.wardScheduleId}
        wardId={wardId}
        wardSupervisorProfileId={profileId}
        initialUpdateWardScheduleIds={props.initialUpdateWardScheduleIds}
        isAddWardScheduleModalOpen={props.isAddWardScheduleModalOpen}
        onAddWardScheduleModalClose={props.onAddWardScheduleModalClose}
        isUpdateWardScheduleModalOpen={props.isUpdateWardScheduleModalOpen}
        onUpdateWardScheduleModalClose={props.onUpdateWardScheduleModalClose}/>
      <DeleteWardScheduleModal
        retrieveWardSchedules={props.retrieveWardSchedules}
        retrieveWardScheduleLoaders={props.retrieveWardScheduleLoaders}
        retrieveWardScheduleZones={props.retrieveWardScheduleZones}
        wardScheduleId={props.wardScheduleId}
        wardSchedules={props.wardSchedules}
        isDeleteWardScheduleModalOpen={props.isDeleteWardScheduleModalOpen}
        onDeleteWardScheduleModalClose={props.onDeleteWardScheduleModalClose}/>
      <AddWardCollectionModal
        wardSchedule={props.wardSchedule}
        wardScheduleLoaders={props.wardScheduleLoaders}
        wardScheduleZones={props.wardScheduleZones}
        isAddWardCollectionCompletedModalOpen={props.isAddWardCollectionCompletedModalOpen}
        onAddWardCollectionCompletedModalClose={props.onAddWardCollectionCompletedModalClose}
        isAddWardCollectionMissedModalOpen={props.isAddWardCollectionMissedModalOpen}
        onAddWardCollectionMissedModalClose={props.onAddWardCollectionMissedModalClose}/>
    </>
  );
}
