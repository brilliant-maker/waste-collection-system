import "../styles/Form.css";

export default function Form ({ children, className = "", ...props }) {
  return (
    <form className={`form ${className}`} {...props}>
      {children}
    </form>
  );
}
