import WardScheduleSupervisorModal from "./WardScheduleSupervisorModal.jsx";
import WardScheduleDriverModal from "./WardScheduleDriverModal.jsx";
import WardScheduleLoadersModal from "./WardScheduleLoadersModal.jsx";
import WardScheduleZonesModal from "./WardScheduleZonesModal.jsx";

export default function WardSchedulesCollectionsModals(props) {
  return (
    <>
      <WardScheduleSupervisorModal
        wardScheduleSupervisors={
        props.wardSchedules ??
        props.wardCollections
        }
        wardScheduleSupervisorProfileId={
        props.wardScheduleSupervisorProfileId ??
        props.wardCollectionSupervisorProfileId
        }
        isWardScheduleSupervisorModalOpen={
        props.isWardScheduleSupervisorModalOpen ??
        props.isWardCollectionSupervisorModalOpen
        }
        onWardScheduleSupervisorModalClose={
        props.onWardScheduleSupervisorModalClose ??
        props.onWardCollectionSupervisorModalClose
        }
      />

      <WardScheduleDriverModal
        wardScheduleDrivers={
        props.wardSchedules ??
        props.wardCollections
        }
        wardScheduleDriverProfileId={
        props.wardScheduleDriverProfileId ??
        props.wardCollectionDriverProfileId
        }
        isWardScheduleDriverModalOpen={
        props.isWardScheduleDriverModalOpen ??
        props.isWardCollectionDriverModalOpen
        }
        onWardScheduleDriverModalClose={
        props.onWardScheduleDriverModalClose ??
        props.onWardCollectionDriverModalClose
        }
      />

      <WardScheduleLoadersModal
        wardScheduleId={
        props.wardScheduleId ??
        props.wardCollectionId
        }
        wardScheduleLoaders={
        props.wardScheduleLoaders ??
        props.wardCollectionLoaders
        }
        isWardScheduleLoadersModalOpen={
        props.isWardScheduleLoadersModalOpen ??
        props.isWardCollectionLoadersModalOpen
        }
        onWardScheduleLoadersModalClose={
        props.onWardScheduleLoadersModalClose ??
        props.onWardCollectionLoadersModalClose
        }
      />

      <WardScheduleZonesModal
        wardScheduleId={
        props.wardScheduleId ??
        props.wardCollectionId
        }
        wardScheduleZones={
        props.wardScheduleZones ??
        props.wardCollectionZones
        }
        isWardScheduleZonesModalOpen={
        props.isWardScheduleZonesModalOpen ??
        props.isWardCollectionZonesModalOpen
        }
        onWardScheduleZonesModalClose={
        props.onWardScheduleZonesModalClose ??
        props.onWardCollectionZonesModalClose
        }/>
    </>
  );
}
