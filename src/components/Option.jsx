import "../styles/Option.css";

export default function Option ({ children, className = "", ...props }) {
  return (
    <option className={`option ${className}`} {...props}>
      {children}
    </option>
  );
}
