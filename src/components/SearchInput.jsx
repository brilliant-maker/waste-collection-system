import Input from "./Input.jsx";

export default function SearchInput ({ className = "", ...props }) {
  return (
    <Input type="search" className={`${className}`} {...props} />
  );
}
