import Input from "./Input.jsx";

export default function EmailInput ({ className = "", ...props }) {
  return (
    <Input type="email" className={`${className}`} {...props} />
  );
}
