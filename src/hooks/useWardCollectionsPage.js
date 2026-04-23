import { useState } from "react";
import useWardCollectionsView from "./useWardCollectionsView.js";
import useWardCollectionLoadersTable from "./useWardCollectionLoadersTable.js";
import useWardCollectionZonesTable from "./useWardCollectionZonesTable.js";
import useProfile from "./useProfile.js";
import currentMonthNumber from "../utils/currentMonthNumber.js";
import currentMonthName from "../utils/currentMonthName.js";
import currentYear from "../utils/currentYear.js";

export default function useWardCollectionsPage() {
  
  /*... Data ...*/
  
  // Collections
  const { wardCollections, isWardCollectionsRetrieving, wardCollectionsRetrieveError } = useWardCollectionsView();
  
  // Loaders
  const { wardCollectionLoaders, isWardCollectionLoadersRetrieving, wardCollectionLoadersRetrieveError } = useWardCollectionLoadersTable();
  
  // Zones
  const { wardCollectionZones, isWardCollectionZonesRetrieving, wardCollectionZonesRetrieveError } = useWardCollectionZonesTable();
  
  // Profile
  const { profile, isProfileLoading, profileError } = useProfile();
  
  /*... State ...*/
  
  // Month
  const [selectedMonth, setSelectedMonth] = useState({
    monthNumber: currentMonthNumber(),
    monthName: currentMonthName()
  });
  const [isSelectWardCollectionMonthModalOpen, setIsSelectWardCollectionMonthModalOpen] = useState(false);
  
  // Year
  const [selectedYear, setSelectedYear] = useState({
    year: currentYear(),
    yearIndex: 5
  });
  const [isSelectWardCollectionYearModalOpen, setIsSelectWardCollectionYearModalOpen] = useState(false);
  
  // Collection
  const [wardCollectionId, setWardCollectionId] = useState(null);
  
  // Supervisor
  const [wardCollectionSupervisorProfileId, setWardCollectionSupervisorProfileId] = useState(null);
  const [isWardCollectionSupervisorModalOpen, setIsWardCollectionSupervisorModalOpen] = useState(false);
  
  // Driver
  const [wardCollectionDriverProfileId, setWardCollectionDriverProfileId] = useState(null);
  const [isWardCollectionDriverModalOpen, setIsWardCollectionDriverModalOpen] = useState(false);
  
  // Loaders
  const [isWardCollectionLoadersModalOpen, setIsWardCollectionLoadersModalOpen] = useState(false);
  
  // Zones
  const [isWardCollectionZonesModalOpen, setIsWardCollectionZonesModalOpen] = useState(false);

  /*... Handlers ...*/
  
  // Month
  const handleSelectWardCollectionMonthClick = () => {
    setIsSelectWardCollectionMonthModalOpen(true);
  };
  const onSelectWardCollectionMonthModalClose = () => {
    setIsSelectWardCollectionMonthModalOpen(false);
  };
  
  // Year
  const handleSelectWardCollectionYearClick = () => {
    setIsSelectWardCollectionYearModalOpen(true);
  };
  const onSelectWardCollectionYearModalClose = () => {
    setIsSelectWardCollectionYearModalOpen(false);
  };
  
  // Supervisor
  const handleViewWardCollectionSupervisorClick = (id) => {
    setWardCollectionSupervisorProfileId(id);
    setIsWardCollectionSupervisorModalOpen(true);
  };
  const onWardCollectionSupervisorModalClose = () => {
    setWardCollectionSupervisorProfileId(null);
    setIsWardCollectionSupervisorModalOpen(false);
  };
  
  // Driver
  const handleViewWardCollectionDriverClick = (id) => {
    setWardCollectionDriverProfileId(id);
    setIsWardCollectionDriverModalOpen(true);
  };
  const onWardCollectionDriverModalClose = () => {
    setWardCollectionDriverProfileId(null);
    setIsWardCollectionDriverModalOpen(false);
  };
  
  // Loaders
  const handleViewWardCollectionLoadersClick = (id) => {
    setWardCollectionId(id);
    setIsWardCollectionLoadersModalOpen(true);
  };
  const onWardCollectionLoadersModalClose = () => {
    setWardCollectionId(null);
    setIsWardCollectionLoadersModalOpen(false);
  };
  
  // Zones
  const handleViewWardCollectionZonesClick = (id) => {
    setWardCollectionId(id);
    setIsWardCollectionZonesModalOpen(true);
  };
  const onWardCollectionZonesModalClose = () => {
    setWardCollectionId(null);
    setIsWardCollectionZonesModalOpen(false);
  };
  
  return {
    // Data
    wardCollections,
    wardCollectionLoaders,
    wardCollectionZones,
    profile,

    // Loading 
    isLoading:
      isWardCollectionsRetrieving ||
      isWardCollectionLoadersRetrieving ||
      isWardCollectionZonesRetrieving ||
      isProfileLoading,
      
    // Error
    error:
      wardCollectionsRetrieveError ||
      wardCollectionLoadersRetrieveError ||
      wardCollectionZonesRetrieveError ||
      profileError,

    // State Data
    selectedMonth,
    selectedYear,
    
    wardCollectionId,
    wardCollectionSupervisorProfileId,
    wardCollectionDriverProfileId,
    
    isSelectWardCollectionMonthModalOpen,
    isSelectWardCollectionYearModalOpen,
    isWardCollectionSupervisorModalOpen,
    isWardCollectionDriverModalOpen,
    isWardCollectionLoadersModalOpen,
    isWardCollectionZonesModalOpen,

    // State Setters
    setSelectedMonth,
    setSelectedYear,
    
    setWardCollectionId,
    setWardCollectionSupervisorProfileId,
    setWardCollectionDriverProfileId,
    
    setIsSelectWardCollectionMonthModalOpen,
    setIsSelectWardCollectionYearModalOpen,
    setIsWardCollectionSupervisorModalOpen,
    setIsWardCollectionDriverModalOpen,
    setIsWardCollectionLoadersModalOpen,
    setIsWardCollectionZonesModalOpen,
    
    // Handlers
    handleSelectWardCollectionMonthClick,
    handleSelectWardCollectionYearClick,
    
    handleViewWardCollectionSupervisorClick,
    handleViewWardCollectionDriverClick,
    handleViewWardCollectionLoadersClick,
    handleViewWardCollectionZonesClick,
    
    onSelectWardCollectionMonthModalClose,
    onSelectWardCollectionYearModalClose,
    
    onWardCollectionSupervisorModalClose,
    onWardCollectionDriverModalClose,
    onWardCollectionLoadersModalClose,
    onWardCollectionZonesModalClose,
    
    // Helpers
    currentMonthNumber,
    currentMonthName,
    currentYear
  };
}
