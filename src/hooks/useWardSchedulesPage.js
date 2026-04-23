import { useState, useMemo } from "react";
import useWardSchedulesView from "./useWardSchedulesView.js";
import useWardScheduleLoadersView from "./useWardScheduleLoadersView.js";
import useWardScheduleZonesView from "./useWardScheduleZonesView.js";
import useProfile from "./useProfile.js";
import currentDayNumber from "../utils/currentDayNumber.js";
import currentDayName from "../utils/currentDayName.js";

export default function useWardSchedulesPage() {
  
  /*... Data ...*/
  
  // Schedules
  const { wardSchedules, isWardSchedulesRetrieving, wardSchedulesRetrieveError, retrieveWardSchedules } = useWardSchedulesView();
  
  // Loaders
  const { wardScheduleLoaders, isWardScheduleLoadersRetrieving, wardScheduleLoadersRetrieveError, retrieveWardScheduleLoaders } = useWardScheduleLoadersView();
  
  // Zones
  const { wardScheduleZones, isWardScheduleZonesRetrieving, wardScheduleZonesRetrieveError, retrieveWardScheduleZones } = useWardScheduleZonesView();
  
  // Profile
  const { profile, isProfileLoading, profileError } = useProfile();
  
  /*... State ...*/
  
  // Day
  const [selectedDay, setSelectedDay] = useState({
    dayNumber: currentDayNumber(),
    dayName: currentDayName()
  });
  const [isSelectWardScheduleDayModalOpen, setIsSelectWardScheduleDayModalOpen] = useState(false);
  
  // Schedule
  const [wardScheduleId, setWardScheduleId] = useState(null);
  const [wardSchedule, setWardSchedule] = useState({});
  
  // Supervisor
  const [wardScheduleSupervisorProfileId, setWardScheduleSupervisorProfileId] = useState(null);
  const [isWardScheduleSupervisorModalOpen, setIsWardScheduleSupervisorModalOpen] = useState(false);
  
  // Driver
  const [wardScheduleDriverProfileId, setWardScheduleDriverProfileId] = useState(null);
  const [isWardScheduleDriverModalOpen, setIsWardScheduleDriverModalOpen] = useState(false);
  
  // Loaders
  const [isWardScheduleLoadersModalOpen, setIsWardScheduleLoadersModalOpen] = useState(false);
  
  // Zones
  const [isWardScheduleZonesModalOpen, setIsWardScheduleZonesModalOpen] = useState(false);
  
  // Add Schedule
  const [isAddWardScheduleModalOpen, setIsAddWardScheduleModalOpen] = useState(false);
  
  // Update Schedule 
  const [initialUpdateWardScheduleIds, setInitialUpdateWardScheduleIds] = useState({
    dayId: null,
    shiftId: null,
    wardWasteId: null,
    wardVehicleId: null,
    wardDriverProfileId: null,
    wardLoaderProfileIds: [],
    zoneIds: []
  });
  const [isUpdateWardScheduleModalOpen, setIsUpdateWardScheduleModalOpen] = useState(false);
  
  // Delete Schedule
  const [isDeleteWardScheduleModalOpen, setIsDeleteWardScheduleModalOpen] = useState(false);
  
  // Add Collection
  const [isAddWardCollectionCompletedModalOpen, setIsAddWardCollectionCompletedModalOpen] = useState(false);
  const [isAddWardCollectionMissedModalOpen, setIsAddWardCollectionMissedModalOpen] = useState(false);
  
  /*... Handlers */
  
  // Day
  const handleSelectWardScheduleDayClick = () => {
    setIsSelectWardScheduleDayModalOpen(true);
  }
  const onSelectWardScheduleDayModalClose = () => {
    setIsSelectWardScheduleDayModalOpen(false);
  }
  
  // Supervisor
  const handleViewWardScheduleSupervisorClick = (wardScheduleSupervisorProfileId) => {
    setWardScheduleSupervisorProfileId(wardScheduleSupervisorProfileId);
    setIsWardScheduleSupervisorModalOpen(true);
  }
  const onWardScheduleSupervisorModalClose = () => {
    setWardScheduleSupervisorProfileId(null);
    setIsWardScheduleSupervisorModalOpen(false);
  }
  
  // Driver
  const handleViewWardScheduleDriverClick = (wardScheduleDriverProfileId) => {
    setWardScheduleDriverProfileId(wardScheduleDriverProfileId);
    setIsWardScheduleDriverModalOpen(true);
  }
  const onWardScheduleDriverModalClose = () => {
    setWardScheduleDriverProfileId(null);
    setIsWardScheduleDriverModalOpen(false);
  }
  
  // Loaders
  const handleViewWardScheduleLoadersClick = (wardScheduleId) => {
    setWardScheduleId(wardScheduleId);
    setIsWardScheduleLoadersModalOpen(true);
  }
  const onWardScheduleLoadersModalClose = () => {
    setWardScheduleId(null);
    setIsWardScheduleLoadersModalOpen(false);
  }
  
  // Zones
  const handleViewWardScheduleZonesClick = (wardScheduleId) => {
    setWardScheduleId(wardScheduleId);
    setIsWardScheduleZonesModalOpen(true);
  }
  const onWardScheduleZonesModalClose = () => {
    setWardScheduleId(null);
    setIsWardScheduleZonesModalOpen(false);
  }
  
  // Add Schedule
  const handleAddWardScheduleClick = () => {
    setIsAddWardScheduleModalOpen(true);
  }
  const onAddWardScheduleModalClose = () => {
    setIsAddWardScheduleModalOpen(false);
  }
  
  // Update Ward Schedule
  const handleUpdateWardScheduleClick = (wardScheduleId) => {

  const selectedWardSchedule = wardSchedules.find(
    ws => ws.ward_schedule_id === wardScheduleId
  );

  const wardLoaderProfileIds = wardScheduleLoaders
    .filter(wsl => wsl.ward_schedule_id === wardScheduleId)
    .map(wsl => wsl.ward_loader_profile_id);

  const zoneIds = wardScheduleZones
    .filter(wsz => wsz.ward_schedule_id === wardScheduleId)
    .map(wsz => wsz.zone_id);

  setInitialUpdateWardScheduleIds({
    dayId: selectedWardSchedule?.day_id ?? null,
    shiftId: selectedWardSchedule?.shift_id ?? null,
    wardWasteId: selectedWardSchedule?.ward_waste_id ?? null,
    wardVehicleId: selectedWardSchedule?.ward_vehicle_id ?? null,
    wardDriverProfileId: selectedWardSchedule?.ward_driver_profile_id ?? null,
    wardLoaderProfileIds: wardLoaderProfileIds ?? [],
    zoneIds: zoneIds ?? []
  });
  
  setWardScheduleId(wardScheduleId);
  setIsUpdateWardScheduleModalOpen(true);
  };
  const onUpdateWardScheduleModalClose = () => {
    setInitialUpdateWardScheduleIds({
      dayId: null,
      shiftId: null,
      wardWasteId: null,
      wardVehicleId: null,
      wardDriverProfileId: null,
      wardLoaderProfileIds: [],
      zoneIds: []
    });
    setWardScheduleId(null);
    setIsUpdateWardScheduleModalOpen(false);
  }
  
  // Delete Schedule
  const handleDeleteWardScheduleClick = (wardScheduleId) => {
    setWardScheduleId(wardScheduleId);
    setIsDeleteWardScheduleModalOpen(true);
  }
  const onDeleteWardScheduleModalClose = () => {
    setWardScheduleId(null);
    setIsDeleteWardScheduleModalOpen(false);
  }
  
  // Add Collection
  const handleAddWardCollectionCompletedClick = (wardSchedule) => {
    setWardSchedule(wardSchedule);
    setIsAddWardCollectionCompletedModalOpen(true);
  }
  const onAddWardCollectionCompletedModalClose = () => {
    setWardSchedule({});
    setIsAddWardCollectionCompletedModalOpen(false);
  }
  
  const handleAddWardCollectionMissedClick = (wardSchedule) => {
    setWardSchedule(wardSchedule);
    setIsAddWardCollectionMissedModalOpen(true);
  }
  const onAddWardCollectionMissedModalClose = () => {
    setWardSchedule({});
    setIsAddWardCollectionMissedModalOpen(false);
  }
  
  
  return {
    // Data
    wardSchedules,
    wardScheduleLoaders,
    wardScheduleZones,
    profile,
    // Loading
    isLoading:
      isWardSchedulesRetrieving ||
      isWardScheduleLoadersRetrieving ||
      isWardScheduleZonesRetrieving ||
      isProfileLoading,
      
    // Error
    error:
      wardSchedulesRetrieveError ||
      wardScheduleLoadersRetrieveError ||
      wardScheduleZonesRetrieveError ||
      profileError,
      
    // Retrieve or Refresh
    retrieveWardSchedules,
    retrieveWardScheduleLoaders,
    retrieveWardScheduleZones,
    
    // State Data
    selectedDay,
    wardScheduleId,
    wardSchedule,
    initialUpdateWardScheduleIds,

    wardScheduleSupervisorProfileId,
    wardScheduleDriverProfileId,
    
    isSelectWardScheduleDayModalOpen,
    
    isWardScheduleSupervisorModalOpen,
    isWardScheduleDriverModalOpen,
    isWardScheduleLoadersModalOpen,
    isWardScheduleZonesModalOpen,

    isAddWardScheduleModalOpen,
    isUpdateWardScheduleModalOpen,
    isDeleteWardScheduleModalOpen,

    isAddWardCollectionCompletedModalOpen,
    isAddWardCollectionMissedModalOpen,

    // State Setters
    setSelectedDay,
    setWardScheduleId,
    setWardSchedule,
    setInitialUpdateWardScheduleIds,
    
    setWardScheduleSupervisorProfileId,
    setWardScheduleDriverProfileId,

    setIsWardScheduleSupervisorModalOpen,
    setIsWardScheduleDriverModalOpen,
    setIsWardScheduleLoadersModalOpen,
    setIsWardScheduleZonesModalOpen,

    setIsAddWardScheduleModalOpen,
    setIsSelectWardScheduleDayModalOpen,
    setIsUpdateWardScheduleModalOpen,
    setIsDeleteWardScheduleModalOpen,

    setIsAddWardCollectionCompletedModalOpen,
    setIsAddWardCollectionMissedModalOpen,
    
    // Handlers
    handleSelectWardScheduleDayClick,
    
    handleViewWardScheduleSupervisorClick,
    handleViewWardScheduleDriverClick,
    handleViewWardScheduleLoadersClick,
    handleViewWardScheduleZonesClick,
    
    handleAddWardScheduleClick,
    handleUpdateWardScheduleClick,
    handleDeleteWardScheduleClick,
    
    handleAddWardCollectionCompletedClick,
    handleAddWardCollectionMissedClick,
    
    onSelectWardScheduleDayModalClose,
    
    onWardScheduleSupervisorModalClose,
    onWardScheduleDriverModalClose,
    onWardScheduleLoadersModalClose,
    onWardScheduleZonesModalClose,
    
    onAddWardScheduleModalClose,
    onUpdateWardScheduleModalClose,
    onDeleteWardScheduleModalClose,
    
    onAddWardCollectionCompletedModalClose,
    onAddWardCollectionMissedModalClose,
    
    // Helpers
    currentDayNumber,
    currentDayName
  };
}
