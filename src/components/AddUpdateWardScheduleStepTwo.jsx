import SelectShift from "./SelectShift.jsx";

export default function AddUpdateWardScheduleStepTwo({
  shifts,
  shiftId,
  setShiftId
}) {
  
  return (
    <SelectShift
      shifts={shifts}
      shiftId={shiftId}
      setShiftId={setShiftId}/>
  );
};
