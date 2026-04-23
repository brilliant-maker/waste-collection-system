export default function Div ({ children, className = "", ...props }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}
