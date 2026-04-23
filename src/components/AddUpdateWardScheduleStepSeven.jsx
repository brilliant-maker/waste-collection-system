import SelectZones from "./SelectZones.jsx";

export default function AddUpdateWardScheduleStepSeven({
  zones,
  zoneIds,
  setZoneIds
}) {
  
  return (
    <SelectZones
      zones={zones}
      zoneIds={zoneIds}
      setZoneIds={setZoneIds}/>
  );
};
