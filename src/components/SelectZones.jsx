import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";
import Button from "./Button.jsx";

export default function SelectZones({
  zones,
  zoneIds,
  setZoneIds
}) {
  
  const toggleZoneId = (zoneId) => {
    setZoneIds(previousZoneIds => previousZoneIds.includes(zoneId)
        ? previousZoneIds.filter(previousZoneId => previousZoneId !== zoneId)
        : [...previousZoneIds, zoneId]
    );
  };

  const clearZoneIds = () => setZoneIds([]);
  
  const header = (
    <>
      {zoneIds.length > 0 && (
      <>
        <Text>
          Total Selected: {zoneIds.length}
        </Text>
        <Button
          className="button-outline button-small"
          onClick={clearZoneIds}>
          Clear All Selected
        </Button>
      </>)}
    </>
  );
  
  const main = zones.map(zone => (
    <Card
      key={zone.zone_id}
      className={`${zoneIds.includes(zone.zone_id) ? "selected" : ""}`}
      onClick={() => toggleZoneId(zone.zone_id)}>
      {zoneIds.includes(zone.zone_id) && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Zone Name: {zone.zone_name}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
