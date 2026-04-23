export default function Aside ({ children, className = "", ...props }) {
  return (
    <aside className={`${className}`} {...props}>
      {children}
    </aside>
  );
}
