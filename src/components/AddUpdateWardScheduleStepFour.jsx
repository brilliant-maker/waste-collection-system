import SelectWardVehicle from "./SelectWardVehicle.jsx";

export default function AddUpdateWardScheduleStepFour({
  wardVehicles,
  wardVehicleId,
  setWardVehicleId
}) {
  
  return (
    <SelectWardVehicle
      wardVehicles={wardVehicles}
      wardVehicleId={wardVehicleId}
      setWardVehicleId={setWardVehicleId}/>
  );
};
