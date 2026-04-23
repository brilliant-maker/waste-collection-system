export default function Footer ({ children, className = "", ...props }) {
  return (
    <footer className={`${className}`} {...props}>
      {children}
    </footer>
  );
}
