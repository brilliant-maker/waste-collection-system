import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Card from "./Card.jsx";
import HeadingTwo from "./HeadingTwo.jsx";
import Text from "./Text.jsx";
import Button from "./Button.jsx";
import CompletedMissedWardCollectionButton from "./CompletedMissedWardCollectionButton.jsx";
import WardScheduleSupervisorCard from "./WardScheduleSupervisorCard.jsx";
import WardScheduleDriverCard from "./WardScheduleDriverCard.jsx";
import WardScheduleLoadersCard from "./WardScheduleLoadersCard.jsx";
import WardScheduleZonesCard from "./WardScheduleZonesCard.jsx";
import useDevice from "../hooks/useDevice.js";

export default function WardSchedulesCard({
  roleType,
  currentDayName,
  dayName,
  wardSchedules,
  wardScheduleLoaders,
  wardScheduleZones,
  handleViewWardScheduleSupervisorClick,
  handleViewWardScheduleDriverClick,
  handleViewWardScheduleLoadersClick,
  handleViewWardScheduleZonesClick,
  handleUpdateWardScheduleClick,
  handleDeleteWardScheduleClick,
  handleAddWardCollectionCompletedClick,
  handleAddWardCollectionMissedClick
}) {
  
  const { isMobile, isTablet, isLaptop, isDesktop } = useDevice();
  
  const isWardSupervisor = roleType === "Ward Supervisor";
  const isWardDriver = roleType === "Ward Driver";
  const isWardLoader = roleType === "Ward Loader";
  
  const selectedWardSchedules = wardSchedules.filter((wardSchedule) => (
    wardSchedule.day_name === dayName
  ));
  
  const main = selectedWardSchedules.length === 0 ? (
    <Text>There is no Schedules</Text>
  ) : (
    selectedWardSchedules.map((wardSchedule) => (
      <Card key={wardSchedule.ward_schedule_id}>
        <Header className="card-header">
          <HeadingTwo>
            {wardSchedule.day_name === currentDayName() ? `Today ${wardSchedule.day_name}` : `${wardSchedule.day_name}`}
          </HeadingTwo>
        </Header>
        <Main className="card-main">
          <Text>
            Shift Type: {wardSchedule.shift_type}
          </Text>
          <Text>
            Starts At: {wardSchedule.starts_at}
          </Text>
          <Text>
            Ends At: {wardSchedule.ends_at}
          </Text>
          <Text>
            Waste Type: {wardSchedule.ward_waste_type}
          </Text>
          <Text>
            Vehicle Type: {wardSchedule.ward_vehicle_type}
          </Text>
          <Text>
            Vehicle Plate Number: {wardSchedule.ward_vehicle_plate_number}
          </Text>

          {((isWardDriver || isWardLoader) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardScheduleSupervisorClick(wardSchedule.ward_supervisor_profile_id)}>
              View Supervisor
            </Button>
          )}
          
          {((isWardDriver || isWardLoader) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleSupervisorCard
              wardScheduleSupervisor={wardSchedule}/>
          )}

          {((isWardSupervisor || isWardLoader) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardScheduleDriverClick(wardSchedule.ward_driver_profile_id)}>
              View Driver
            </Button>
          )}
          
          {((isWardSupervisor || isWardLoader) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleDriverCard
              wardScheduleDriver={wardSchedule}/>
          )}

          {((isWardSupervisor || isWardDriver) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardScheduleLoadersClick(wardSchedule.ward_schedule_id)}>
              View Loaders
            </Button>
          )}
          
          {((isWardSupervisor || isWardDriver) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleLoadersCard
              wardScheduleId={wardSchedule.ward_schedule_id}
              wardScheduleLoaders={wardScheduleLoaders}/>
          )}

          {((isWardSupervisor || isWardDriver || isWardLoader) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardScheduleZonesClick(wardSchedule.ward_schedule_id)}>
              View Zones
            </Button>
          )}
          
          {((isWardSupervisor || isWardDriver || isWardLoader) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleZonesCard
              wardScheduleId={wardSchedule.ward_schedule_id}
              wardScheduleZones={wardScheduleZones}/>
          )}
        </Main>

        <Footer className="card-footer">
          {isWardSupervisor && (
            <>
              <Button
                className="button-secondary button-medium"
                onClick={() => handleUpdateWardScheduleClick(wardSchedule.ward_schedule_id)}>
                Update Schedule
              </Button>
              <Button
                className="button-secondary button-medium"
                onClick={() => handleDeleteWardScheduleClick(wardSchedule.ward_schedule_id)}>
                Delete Schedule
              </Button>
            </>
          )}

          {isWardDriver && (
            <CompletedMissedWardCollectionButton
              currentDayName={currentDayName}
              wardSchedule={wardSchedule}
              handleAddWardCollectionCompletedClick={handleAddWardCollectionCompletedClick}
              handleAddWardCollectionMissedClick={handleAddWardCollectionMissedClick}
            />
          )}
        </Footer>
      </Card>
    ))
  );

  return (
    <>
      {main}
    </>
  );
}
