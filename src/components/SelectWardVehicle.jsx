import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectWardVehicle({
  wardVehicles,
  wardVehicleId,
  setWardVehicleId
}) {
  
  const main = wardVehicles.map(wardVehicle => (
    <Card
      key={wardVehicle.ward_vehicle_id}
      className={`${wardVehicleId === wardVehicle.ward_vehicle_id ? "selected" : ""}`}
      onClick={() => setWardVehicleId(wardVehicle.ward_vehicle_id)}>
      {wardVehicleId === wardVehicle.ward_vehicle_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Vehicle Type: {wardVehicle.vehicle_type}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
