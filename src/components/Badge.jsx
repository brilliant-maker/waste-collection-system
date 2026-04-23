import Span from "./Span.jsx";

export default function Badge ({ children, className = "", ...props }) {
  return (
    <Span className={`badge ${className}`} {...props}>
      {children}
    </Span>
  );
}
