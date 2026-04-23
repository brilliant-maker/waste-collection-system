import Input from "./Input.jsx";

export default function TextInput ({ className = "", ...props }) {
  return (
    <Input type="text" className={`${className}`} {...props} />
  );
}
