import Input from "./Input.jsx";

export default function PasswordInput ({ className = "", ...props }) {
  return (
    <Input type="password" className={`${className}`} {...props} />
  );
}
