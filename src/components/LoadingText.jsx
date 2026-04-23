import Text from "./Text.jsx";

export default function LoadingText ({ children, className = "", ...props }) {
  return (
    <Text className={`${className}`} {...props}>
      {children}
    </Text>
  );
}
