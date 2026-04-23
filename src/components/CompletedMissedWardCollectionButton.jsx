import { useMemo } from "react";
import useTime from "../hooks/useTime.js";
import Button from "./Button.jsx";

export default function CompletedMissedWardCollectionButton({
  currentDayName,
  wardSchedule,
  handleAddWardCollectionCompletedClick,
  handleAddWardCollectionMissedClick
}) {
  const { currentHour, currentMinute } = useTime();

  const shouldShowButtons = useMemo(() => {
    if (!wardSchedule) return false;
    
    if (wardSchedule.day_name !== currentDayName()) {
      return false;
    }

    // Guard for missing time data
    if (!wardSchedule.starts_at || !wardSchedule.ends_at) {
      return false;
    }

    const currentMinutes = currentHour * 60 + currentMinute;

    const [startH, startM] = wardSchedule.starts_at.split(":").map(Number);
    const [endH, endM] = wardSchedule.ends_at.split(":").map(Number);

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
      return false;
    }

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    // Check if current time is within the shift
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }, [currentHour, currentMinute, wardSchedule]);

  if (!shouldShowButtons) return null;

  return (
    <>
      <Button
        className="button-secondary button-medium"
        onClick={() => handleAddWardCollectionCompletedClick(wardSchedule)}>
        Completed Collection
      </Button>
      <Button
        className="button-secondary button-medium"
        onClick={() => handleAddWardCollectionMissedClick(wardSchedule)}>
        Missed Collection
      </Button>
    </>
  );
}
