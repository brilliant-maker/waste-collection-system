import Card from "./Card.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Text from "./Text.jsx";

export default function WardScheduleZonesCard({
  wardScheduleId,
  wardScheduleZones
}) {
  
   const header = (
    <HeadingThree>
      Zones
    </HeadingThree>
  );
  
  const selectedWardScheduleZones = wardScheduleZones.filter(
  (wardScheduleZone) =>
    (wardScheduleZone.ward_schedule_id ?? wardScheduleZone.ward_collection_id) === wardScheduleId
  );
  
  const main = selectedWardScheduleZones.map((selectedWardScheduleZone) => (
    <Card
      key={selectedWardScheduleZone.ward_schedule_zone_id ?? selectedWardScheduleZone.ward_collection_zone_id}>
      <Text>
        Zone Name: {selectedWardScheduleZone.zone_name}
      </Text>
    </Card>)
  );
  
  return (
    <>
      {header}
      {main}
    </>
  )
}
