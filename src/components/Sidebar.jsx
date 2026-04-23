import Aside from "./Aside.jsx";
import "../styles/Sidebar.css";

export default function Sidebar ({ children, className = "", ...props }) {
  return (
    <Aside className={`sidebar ${className}`} {...props}>
      {children}
    </Aside>
  );
}
