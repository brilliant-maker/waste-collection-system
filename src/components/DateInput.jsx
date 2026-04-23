import Input from "./Input.jsx";

export default function DateInput ({ className = "", ...props }) {
  return (
    <Input type="date" className={`${className}`} {...props} />
  );
}
