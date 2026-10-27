import Header from "./Header.jsx";
import HeadingTwo from "./HeadingTwo.jsx";
import Button from "./Button.jsx";
import Div from "./Div.jsx";

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
      <Div
        className="ward-schedules-header-buttons">
        {isWardSupervisor && (
        <Button
          className="button-primary button-medium"
          onClick={handleAddWardScheduleClick}>
          Add Schedule
        </Button>
        )}
        <Button
          className="button-outline button-small ward-schedules-select-day-button"
          onClick={handleSelectWardScheduleDayClick}>
          Select Day
        </Button>
      </Div>
    </Header>
  );
}
