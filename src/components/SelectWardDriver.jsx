import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectWardDriver({
  wardDrivers,
  wardDriverProfileId,
  setWardDriverProfileId
}) {
  
  const main = wardDrivers.map(wardDriver => (
    <Card
      key={wardDriver.profile_id}
      className={`${wardDriverProfileId === wardDriver.profile_id ? "selected" : ""}`}
      onClick={() => setWardDriverProfileId(wardDriver.profile_id)}>
      {wardDriverProfileId === wardDriver.profile_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        First Name: {wardDriver.first_name}
      </Text>
      <Text>
        Last Name: {wardDriver.last_name}
      </Text>
      <Text>
        Gender: {wardDriver.gender_type}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
