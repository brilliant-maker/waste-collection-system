import Text from "./Text.jsx";

export default function CopyrightText () {
  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <Text>
      {`Copyright ${year}`}
    </Text>
  );
}
