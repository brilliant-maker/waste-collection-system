import "../styles/Navigation.css";

export default function Navigation ({ children, className = "", ...props }) {
  return (
    <nav className={`navigation ${className}`} {...props}>
      {children}
    </nav>
  );
}
