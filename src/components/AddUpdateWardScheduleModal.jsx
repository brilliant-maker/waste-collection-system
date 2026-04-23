import { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import Card from "./Card.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import HeadingTwo from "./HeadingTwo.jsx";
import HeadingThree from "./HeadingThree.jsx";
import LoadingText from "./LoadingText.jsx";
import ErrorText from "./ErrorText.jsx";
import Button from "./Button.jsx";
import AddUpdateWardScheduleStepOne from "./AddUpdateWardScheduleStepOne.jsx";
import AddUpdateWardScheduleStepTwo from "./AddUpdateWardScheduleStepTwo.jsx";
import AddUpdateWardScheduleStepThree from "./AddUpdateWardScheduleStepThree.jsx";
import AddUpdateWardScheduleStepFour from "./AddUpdateWardScheduleStepFour.jsx";
import AddUpdateWardScheduleStepFive from "./AddUpdateWardScheduleStepFive.jsx";
import AddUpdateWardScheduleStepSix from "./AddUpdateWardScheduleStepSix.jsx";
import AddUpdateWardScheduleStepSeven from "./AddUpdateWardScheduleStepSeven.jsx";
import { showToast } from "./Toast.jsx";

import useDaysTable from "../hooks/useDaysTable.js";
import useShiftsTable from "../hooks/useShiftsTable.js";
import useWardWastesView from "../hooks/useWardWastesView.js";
import useWardVehiclesView from "../hooks/useWardVehiclesView.js";
import useWardDriversView from "../hooks/useWardDriversView.js";
import useWardLoadersView from "../hooks/useWardLoadersView.js";
import useZonesView from "../hooks/useZonesView.js";
import useWardScheduleRPC from "../hooks/useWardScheduleRPC.js";

export default function AddUpdateWardScheduleModal({
  retrieveWardSchedules,
  retrieveWardScheduleLoaders,
  retrieveWardScheduleZones,
  wardScheduleId,
  wardId,
  wardSupervisorProfileId,
  initialUpdateWardScheduleIds,
  isAddWardScheduleModalOpen,
  onAddWardScheduleModalClose,
  isUpdateWardScheduleModalOpen,
  onUpdateWardScheduleModalClose
}) {
  
  const [currentStep, setCurrentStep] = useState(1);
  const [dayId, setDayId] = useState(null);
  const [shiftId, setShiftId] = useState(null);
  const [wardWasteId, setWardWasteId] = useState(null);
  const [wardVehicleId, setWardVehicleId] = useState(null);
  const [wardDriverProfileId, setWardDriverProfileId] = useState(null);
  const [wardLoaderProfileIds, setWardLoaderProfileIds] = useState([]);
  const [zoneIds, setZoneIds] = useState([]);
  
  useEffect(() => {
    if (isUpdateWardScheduleModalOpen) {
      setDayId(initialUpdateWardScheduleIds.dayId);
      setShiftId(initialUpdateWardScheduleIds.shiftId);
      setWardWasteId(initialUpdateWardScheduleIds.wardWasteId);
      setWardVehicleId(initialUpdateWardScheduleIds.wardVehicleId);
      setWardDriverProfileId(initialUpdateWardScheduleIds.wardDriverProfileId);
      setWardLoaderProfileIds(initialUpdateWardScheduleIds.wardLoaderProfileIds);
      setZoneIds(initialUpdateWardScheduleIds.zoneIds);
    }
  }, [initialUpdateWardScheduleIds, isUpdateWardScheduleModalOpen]);

  const { days, isDaysRetrieving, daysRetrieveError } = useDaysTable();
  const { shifts, isShiftsRetrieving, shiftsRetrieveError } = useShiftsTable();
  const { wardWastes, isWardWastesRetrieving, wardWastesRetrieveError } = useWardWastesView();
  const { wardVehicles, isWardVehiclesRetrieving, wardVehiclesRetrieveError } = useWardVehiclesView();
  const { wardDrivers, isWardDriversRetrieving, wardDriversRetrieveError } = useWardDriversView();
  const { wardLoaders, isWardLoadersRetrieving, wardLoadersRetrieveError } = useWardLoadersView();
  const { zones, isZonesRetrieving, zonesRetrieveError } = useZonesView();
  const { addWardSchedule, updateWardSchedule, getState } = useWardScheduleRPC();
  const { data : addWardScheduleData, isExecuting : isAddWardScheduleExecuting, error : addWardScheduleError } = getState("addWardSchedule");
  const { data : updateWardScheduleData, isExecuting : isUpdateWardScheduleExecuting, error : updateWardScheduleError } = getState("updateWardSchedule");
  
  const totalSteps = 7;
  const previous = () => setCurrentStep((previousStep) => previousStep - 1);
  const next = () => setCurrentStep((previousStep) => previousStep + 1);
  
  const handleAddWardSchedule = async () => {
    const wardSchedulePayload = {
      ward_id: wardId,
      ward_supervisor_profile_id: wardSupervisorProfileId,
      ward_driver_profile_id: wardDriverProfileId,
      ward_vehicle_id: wardVehicleId,
      ward_waste_id: wardWasteId,
      day_id: dayId,
      shift_id: shiftId,
      ward_loader_profile_ids: wardLoaderProfileIds.map(id => ({
        profile_id: id
      })),
      zone_ids: zoneIds.map(id => ({
        id: id}))
    };
    
    const id = await addWardSchedule(wardSchedulePayload);
    
    retrieveWardSchedules();
    retrieveWardScheduleLoaders();
    retrieveWardScheduleZones();
    
    if(!id) {
      showToast("Failed to Add Schedule","error");
    }
    
    showToast("Successfully Added Schedule ","success");
    
    
    
    onAddWardScheduleModalClose();
    setCurrentStep(1);
    setDayId(null);
    setShiftId(null);
    setWardWasteId(null);
    setWardVehicleId(null);
    setWardDriverProfileId(null);
    setWardLoaderProfileIds([]);
    setZoneIds([]);
  };
  
  const handleUpdateWardSchedule = async () => {
    const wardSchedulePayload = {
      ward_schedule_id: wardScheduleId,
      ward_id: wardId,
      ward_supervisor_profile_id: wardSupervisorProfileId,
      ward_driver_profile_id: wardDriverProfileId,
      ward_vehicle_id: wardVehicleId,
      ward_waste_id: wardWasteId,
      day_id: dayId,
      shift_id: shiftId,
      ward_loader_profile_ids: wardLoaderProfileIds.map(id => ({
        profile_id: id
      })),
      zone_ids: zoneIds.map(id => ({
        id: id}))
    };
    
    const id = await updateWardSchedule(wardSchedulePayload);
    
    retrieveWardSchedules();
    retrieveWardScheduleLoaders();
    retrieveWardScheduleZones();
    
    if(!id) {
      showToast("Failed to Update Schedule","error");
    }
    
    showToast("Successfully Updated Schedule ","success");
    
    onUpdateWardScheduleModalClose();
    setCurrentStep(1);
    setDayId(null);
    setShiftId(null);
    setWardWasteId(null);
    setWardVehicleId(null);
    setWardDriverProfileId(null);
    setWardLoaderProfileIds([]);
    setZoneIds([]);
  };
  
  const handleClose = () => {
    isUpdateWardScheduleModalOpen
    ? onUpdateWardScheduleModalClose()
    : onAddWardScheduleModalClose();
    setCurrentStep(1);
    setDayId(null);
    setShiftId(null);
    setWardWasteId(null);
    setWardVehicleId(null);
    setWardDriverProfileId(null);
    setWardLoaderProfileIds([]);
    setZoneIds([]);
  }
  
  const isStepOne = currentStep === 1;
  const isStepTwo = currentStep === 2;
  const isStepThree = currentStep === 3;
  const isStepFour = currentStep === 4;
  const isStepFive = currentStep === 5;
  const isStepSix = currentStep === 6;
  const isStepSeven = currentStep === 7;
  
  const main = (
    <Modal
      isOpen={isAddWardScheduleModalOpen || isUpdateWardScheduleModalOpen}>
      <Header className="modal-header">
        <HeadingTwo>
          {`Step ${currentStep} of ${totalSteps}`}
        </HeadingTwo>
        <HeadingThree>
          {
          (isStepOne && "Select Day") ||
          (isStepTwo && "Select Shift") ||
          (isStepThree && "Select Waste") ||
          (isStepFour && "Select Vehicle") ||
          (isStepFive && "Select Driver") ||
          (isStepSix && "Select Loaders") ||
          (isStepSeven && "Select Zones")
          }
        </HeadingThree>
      </Header>
      <Main className="modal-main">
        {isDaysRetrieving ||
        isShiftsRetrieving ||
        isWardWastesRetrieving ||
        isWardVehiclesRetrieving ||
        isWardDriversRetrieving ||
        isWardLoadersRetrieving ||
        isZonesRetrieving ? (
          <LoadingText>
            Loading...
          </LoadingText>
        ) :
        daysRetrieveError ||
        shiftsRetrieveError ||
        wardWastesRetrieveError ||
        wardVehiclesRetrieveError ||
        wardDriversRetrieveError ||
        wardLoadersRetrieveError ||
        zonesRetrieveError ? (
          <ErrorText>
            Error: {
            daysRetrieveError ||
            shiftsRetrieveError ||
            wardWastesRetrieveError ||
            wardVehiclesRetrieveError ||
            wardDriversRetrieveError ||
            wardLoadersRetrieveError ||
            zonesRetrieveError
            }
          </ErrorText>
        ) : (
        <Card>
          {isStepOne && (
          <AddUpdateWardScheduleStepOne
            days={days}
            dayId={dayId}
            setDayId={setDayId}/>
          )}
          {isStepTwo && (
          <AddUpdateWardScheduleStepTwo
            shifts={shifts}
            shiftId={shiftId}
            setShiftId={setShiftId}/>
          )}
          {isStepThree && (
          <AddUpdateWardScheduleStepThree
            wardWastes={wardWastes}
            wardWasteId={wardWasteId}
            setWardWasteId={setWardWasteId}/>
          )}
          {isStepFour && (
          <AddUpdateWardScheduleStepFour
            wardVehicles={wardVehicles}
            wardVehicleId={wardVehicleId}
            setWardVehicleId={setWardVehicleId}/>
          )}
          {isStepFive && (
          <AddUpdateWardScheduleStepFive
            wardDrivers={wardDrivers}
            wardDriverProfileId={wardDriverProfileId}
            setWardDriverProfileId={setWardDriverProfileId}/>
          )}
          {isStepSix && (
          <AddUpdateWardScheduleStepSix
            wardLoaders={wardLoaders}
            wardLoaderProfileIds={wardLoaderProfileIds}
            setWardLoaderProfileIds={setWardLoaderProfileIds}/>
          )}
          {isStepSeven && (
          <AddUpdateWardScheduleStepSeven
            zones={zones}
            zoneIds={zoneIds}
            setZoneIds={setZoneIds}/>
          )}
        </Card>)}
      </Main>
      <Footer
        className="modal-footer">
        {(addWardScheduleError || updateWardScheduleError) && (
          <ErrorText>
            {addWardScheduleError || updateWardScheduleError}
          </ErrorText>
        )}
        {currentStep > 1 && (
          <Button
            className="button-outline button-small"
            onClick={previous}>
            Previous
          </Button>
        )}
        {currentStep < 7 && (
          <Button
            className="button-outline button-small"
            onClick={next}>
            Next
          </Button>
        )}
        {currentStep === 7 && (
          <Button
            className="button-secondary button-medium"
            disabled={
            isAddWardScheduleExecuting ||
            isUpdateWardScheduleExecuting ||
            !dayId ||
            !shiftId ||
            !wardWasteId ||
            !wardVehicleId ||
            !wardDriverProfileId ||
            !wardLoaderProfileIds?.length ||
            !zoneIds?.length}
            onClick={isUpdateWardScheduleModalOpen ? handleUpdateWardSchedule : handleAddWardSchedule}>
            {isUpdateWardScheduleModalOpen ? (isUpdateWardScheduleExecuting ? "Updating Schedule..." : "Update Schedule") : (isAddWardScheduleExecuting ? "Adding Schedule..." : "Add Schedule")}
          </Button>
        )}
        <Button
          className="button-outline button-small"
          onClick={handleClose}>
          Close
        </Button>
      </Footer>
    </Modal>
  );

  return (
    <>
      {main}
    </>
  );
};
