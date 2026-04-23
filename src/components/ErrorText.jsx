import Text from "./Text.jsx";

export default function ErrorText ({ children, className = "", ...props }) {
  return (
    <Text className={`${className}`} {...props}>
      {children}
    </Text>
  );
}
