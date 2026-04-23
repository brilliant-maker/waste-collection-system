import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectDay({
  days,
  dayId,
  setDayId
}) {
  
  const main = days.map(day => (
    <Card
      key={day.day_id}
      className={`${dayId === day.day_id ? "selected" : ""}`}
      onClick={() => setDayId(day.day_id)}
          >
      {dayId === day.day_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Day Name: {day.day_name}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
}
