import Card from "./Card.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Text from "./Text.jsx";

export default function WardScheduleLoadersCard({
  wardScheduleId,
  wardScheduleLoaders
}) {
  
  const selectedWardScheduleLoaders = wardScheduleLoaders.filter(
  (wardScheduleLoader) =>
    (wardScheduleLoader.ward_schedule_id ?? wardScheduleLoader.ward_collection_id) === wardScheduleId
  );
  
  const header = (
    <HeadingThree>
      Loaders
    </HeadingThree>
  );
  
  const main = selectedWardScheduleLoaders.map((selectedWardScheduleLoader) => (
      <Card
        key={selectedWardScheduleLoader.ward_schedule_loader_id ?? selectedWardScheduleLoader.ward_collection_loader_id}>
        <Text>
          First Name: {selectedWardScheduleLoader.ward_loader_first_name}
        </Text>
        <Text>
          Middle Name: {selectedWardScheduleLoader.ward_loader_middle_name ?? "None"}
        </Text>
        <Text>
          Last Name: {selectedWardScheduleLoader.ward_loader_last_name}
        </Text>
        <Text>
          Gender: {selectedWardScheduleLoader.ward_loader_gender_type}
        </Text>
        <Text>
          Phone Number: 0{selectedWardScheduleLoader.ward_loader_phone_number}
        </Text>
      </Card>)
  );
  
  return (
    <>
      {header}
      {main}
    </>
  )
}
