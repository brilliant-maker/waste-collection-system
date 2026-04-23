import SelectWardDriver from "./SelectWardDriver.jsx";

export default function AddUpdateWardScheduleStepFive({
  wardDrivers,
  wardDriverProfileId,
  setWardDriverProfileId
}) {
  
  return (
    <SelectWardDriver
      wardDrivers={wardDrivers}
      wardDriverProfileId={wardDriverProfileId}
      setWardDriverProfileId={setWardDriverProfileId}/>
  );
};
