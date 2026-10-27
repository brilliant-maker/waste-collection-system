import Div from "./Div.jsx";
import "../styles/Center.css";

export default function Center({ children, className = "", ...props }) {
  return (
    <Div className={`center ${className}`} {...props}>
      {children}
    </Div>
  );
}
