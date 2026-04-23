import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectShift({
  shifts,
  shiftId,
  setShiftId
}) {
  
  const main = shifts.map(shift => (
    <Card
      key={shift.shift_id}
      className={`${shiftId === shift.shift_id ? "selected" : ""}`}
      onClick={() => setShiftId(shift.shift_id)}>
      {shiftId === shift.shift_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Shift Type: {shift.shift_type}
      </Text>
      <Text>
        Starts At: {shift.starts_at}
      </Text>
      <Text>
        Ends At: {shift.ends_at}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
