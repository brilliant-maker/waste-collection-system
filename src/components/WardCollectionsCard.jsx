import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Card from "./Card.jsx";
import Div from "./Div.jsx";
import HeadingTwo from "./HeadingTwo.jsx";
import Text from "./Text.jsx";
import Button from "./Button.jsx";
import WardScheduleDriverCard from "./WardScheduleDriverCard.jsx";
import WardScheduleLoadersCard from "./WardScheduleLoadersCard.jsx";
import WardScheduleZonesCard from "./WardScheduleZonesCard.jsx";
import useDevice from "../hooks/useDevice.js";
import formatTimestamp from "../utils/formatTimestamp.js";

export default function WardCollectionsCard({
  roleType,
  currentMonthName,
  currentYear,
  wardCollections,
  wardCollectionLoaders,
  wardCollectionZones,
  handleViewWardCollectionDriverClick,
  handleViewWardCollectionLoadersClick,
  handleViewWardCollectionZonesClick
}) {
  
  const { isMobile, isTablet, isLaptop, isDesktop } = useDevice();
  
  const isWardSupervisor = roleType === "Ward Supervisor";
  
  const selectedWardCollections = wardCollections
  .map((wardCollection) => (
    {
    ...wardCollection,
    formattedAddedAt: formatTimestamp(wardCollection.added_at)
    }));
  
  const main = selectedWardCollections.length === 0 ? (
    <Text>There is no Collections</Text>
  ) : (
    selectedWardCollections.map((wardCollection) => (
      <Card key={wardCollection.ward_collection_id}>
        <Header className="card-header">
          <HeadingTwo>
            {(wardCollection.month_name === currentMonthName() && wardCollection.year === currentYear()) ? `This ${wardCollection.month_name} ${wardCollection.year}` : `${wardCollection.month_name} ${wardCollection.year}`}
          </HeadingTwo>
        </Header>
        <Main className="card-main">
          <Text>
            Day: {wardCollection.formattedAddedAt.longDayName}
          </Text>
          <Text>
            Date: {wardCollection.formattedAddedAt.date}
          </Text>
          <Text>
            Shift Type: {wardCollection.shift_type}
          </Text>
          <Text>
            Shift Started At: {wardCollection.starts_at}
          </Text>
          <Text>
            Shift Ended At: {wardCollection.ends_at}
          </Text>
          <Text>
            Collected Waste Type: {wardCollection.ward_waste_type}
          </Text>
          <Text>
            Used Vehicle Type: {wardCollection.ward_vehicle_type}
          </Text>
          <Text>
            Used Vehicle Plate Number: {wardCollection.ward_vehicle_plate_number}
          </Text>
          <Text>
            {wardCollection.collection_status_type === "Completed"
            ?
            `Completed At: ${wardCollection.formattedAddedAt.timePart24Hours}`
            : 
            `Missed At: ${wardCollection.formattedAddedAt.timePart24Hours}`}
          </Text>
          <Text>
            {wardCollection.collection_status_type === "Completed"
            ?
            `Completed Note: ${wardCollection.collection_note_short}`
            : 
            `Missed Note: ${wardCollection.collection_note_short}`}
          </Text>
          <Div className="card-main-mobile-buttons">
          {((isWardSupervisor) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardCollectionDriverClick(wardCollection.ward_driver_profile_id)}>
              View Driver
            </Button>
          )}
          
          {((isWardSupervisor) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleDriverCard
              wardScheduleDriver={wardCollection}/>
          )}

          {((isWardSupervisor) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardCollectionLoadersClick(wardCollection.ward_collection_id)}>
              View Loaders
            </Button>
          )}
          
          {((isWardSupervisor) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleLoadersCard
              wardScheduleId={wardCollection.ward_collection_id}
              wardScheduleLoaders={wardCollectionLoaders}/>
          )}

          {((isWardSupervisor) && (isMobile)) && (
            <Button
              className="card-main-button button-outline button-small"
              onClick={() => handleViewWardCollectionZonesClick(wardCollection.ward_collection_id)}>
              View Zones
            </Button>
          )}
          </Div>
          
          {((isWardSupervisor) && (isTablet || isLaptop || isDesktop)) && (
            <WardScheduleZonesCard
              wardScheduleId={wardCollection.ward_collection_id}
              wardScheduleZones={wardCollectionZones}/>
          )}
        </Main>
      </Card>
    ))
  );

  return (
    <>
      {main}
    </>
  );
}
