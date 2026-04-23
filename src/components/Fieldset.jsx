export default function Fieldset ({ children, className = "", ...props }) {
  return (
    <fieldset className={`fieldset ${className}`} {...props}>
      {children}
    </fieldset>
  );
}
