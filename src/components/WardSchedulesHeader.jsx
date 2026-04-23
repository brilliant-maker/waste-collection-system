import Header from "./Header.jsx";
import HeadingTwo from "./HeadingTwo.jsx";
import Button from "./Button.jsx";

export default function WardSchedulesHeader({
  wardName,
  isWardSupervisor,
  handleAddWardScheduleClick,
  handleSelectWardScheduleDayClick
}) {
  
  return (
    <Header>
      <HeadingTwo>
        {wardName} Schedules
      </HeadingTwo>
      {isWardSupervisor && (
      <Button
        className="button-primary button-medium"
        onClick={handleAddWardScheduleClick}>
        Add Schedule
      </Button>
      )}
      <Button
        className="button-outline button-small"
        onClick={handleSelectWardScheduleDayClick}>
        Select Day
      </Button>
    </Header>
  );
}
