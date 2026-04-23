export default function Label ({ children, className = "", ...props }) {
  return (
    <label className={`input-label ${className}`} {...props}>
      {children}
    </label>
  );
}
