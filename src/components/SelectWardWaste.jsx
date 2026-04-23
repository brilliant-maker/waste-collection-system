import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectWardWaste({
  wardWastes,
  wardWasteId,
  setWardWasteId
}) {
  
  const main = wardWastes.map(wardWaste => (
    <Card
      key={wardWaste.ward_waste_id}
      className={`${wardWasteId === wardWaste.ward_waste_id ? "selected" : ""}`}
      onClick={() => setWardWasteId(wardWaste.ward_waste_id)}>
      {wardWasteId === wardWaste.ward_waste_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Waste Type: {wardWaste.waste_type}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
