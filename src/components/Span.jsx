export default function Span ({ children, className = "", ...props }) {
  return (
    <span className={`${className}`} {...props}>
      {children}
    </span>
  );
}
