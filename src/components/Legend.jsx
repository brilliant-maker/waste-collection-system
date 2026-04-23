export default function Legend ({ children, className = "", ...props }) {
  return (
    <legend className={`legend ${className}`} {...props}>
      {children}
    </legend>
  );
}
