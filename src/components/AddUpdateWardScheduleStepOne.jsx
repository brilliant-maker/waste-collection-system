import SelectDay from "./SelectDay.jsx";

export default function AddUpdateWardScheduleStepOne({
  days,
  dayId,
  setDayId
}) {
  
  return (
    <SelectDay
      days={days}
      dayId={dayId}
      setDayId={setDayId}/>
  );
};
