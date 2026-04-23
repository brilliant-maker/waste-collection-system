import Card from "./Card.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Text from "./Text.jsx";

export default function WardScheduleDriverCard({
  wardScheduleDriver
}) {
  
  const header = (
    <HeadingThree>
      Driver
    </HeadingThree>
  );
  
  const main = (
    <Card
      key={wardScheduleDriver.ward_schedule_id ?? wardScheduleDriver.ward_collection_id}>
      <Text>
        First Name: {wardScheduleDriver.ward_driver_first_name}
      </Text>
      <Text>
        Middle Name: {wardScheduleDriver.ward_driver_middle ?? "None"}
      </Text>
      <Text>
        Last Name: {wardScheduleDriver.ward_driver_last_name}
      </Text>
      <Text>
        Gender: {wardScheduleDriver.ward_driver_gender_type}
      </Text>
      <Text>
        Phone Number: 0{wardScheduleDriver.ward_driver_phone_number}
      </Text>
    </Card>
  );
  
  return (
    <>
      {header}
      {main}
    </>
  )
}
