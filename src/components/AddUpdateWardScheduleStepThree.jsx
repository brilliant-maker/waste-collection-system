import SelectWardWaste from "./SelectWardWaste.jsx";

export default function AddUpdateWardScheduleStepThree({
  wardWastes,
  wardWasteId,
  setWardWasteId
}) {
  
  return (
    <SelectWardWaste
      wardWastes={wardWastes}
      wardWasteId={wardWasteId}
      setWardWasteId={setWardWasteId}/>
  );
};
