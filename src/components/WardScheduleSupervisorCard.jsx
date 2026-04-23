import Card from "./Card.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Text from "./Text.jsx";

export default function WardScheduleSupervisorCard({
  wardScheduleSupervisor
}) {
  
  const header = (
    <HeadingThree>
      Supervisor
    </HeadingThree>
  );
  
  const main = (
    <Card
      key={wardScheduleSupervisor.ward_schedule_id ?? wardScheduleSupervisor.ward_collection_id}>
      <Text>
        First Name: {wardScheduleSupervisor.ward_supervisor_first_name}
      </Text>
      <Text>
        Middle Name: {wardScheduleSupervisor.ward_supervisor_middle ?? "None"}
      </Text>
      <Text>
        Last Name: {wardScheduleSupervisor.ward_supervisor_last_name}
      </Text>
      <Text>
        Gender: {wardScheduleSupervisor.ward_supervisor_gender_type}
      </Text>
      <Text>
        Phone Number: 0{wardScheduleSupervisor.ward_supervisor_phone_number}
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
