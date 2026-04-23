import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";
import Button from "./Button.jsx";

export default function SelectWardLoaders({
  wardLoaders,
  wardLoaderProfileIds,
  setWardLoaderProfileIds
}) {
  
  const toggleWardLoaderProfileId = (profile_id) => {
    setWardLoaderProfileIds(previousWardLoaderProfileIds => previousWardLoaderProfileIds.includes(profile_id)
        ? previousWardLoaderProfileIds.filter(previousWardLoaderProfileId => previousWardLoaderProfileId !== profile_id)
        : [...previousWardLoaderProfileIds, profile_id]
    );
  };

  const clearWardLoaderProfileIds = () => setWardLoaderProfileIds([]);
  
  const header = (
    <>
      {wardLoaderProfileIds.length > 0 && (
      <>
        <Text>
          Total Selected: {wardLoaderProfileIds.length}
        </Text>
        <Button
          className="button-outline button-small"
          onClick={clearWardLoaderProfileIds}>
          Clear All Selected
        </Button>
      </>)}
    </>
  );
  
  const main = wardLoaders.map(wardLoader => (
    <Card
      key={wardLoader.profile_id}
      className={`${wardLoaderProfileIds.includes(wardLoader.profile_id) ? "selected" : ""}`}
      onClick={() => toggleWardLoaderProfileId(wardLoader.profile_id)}>
      {wardLoaderProfileIds.includes(wardLoader.profile_id) && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        First Name: {wardLoader.first_name}
      </Text>
      <Text>
        Last Name: {wardLoader.last_name}
      </Text>
      <Text>
        Gender: {wardLoader.gender_type}
      </Text>
    </Card>
  ));

  return (
    <>
      {header}
      {main}
    </>
  );
};
