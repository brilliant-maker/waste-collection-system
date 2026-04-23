export default function Header ({ children, className = "", ...props }) {
  return (
    <header className={`${className}`} {...props}>
      {children}
    </header>
  );
}
