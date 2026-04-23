export default function Main ({ children, className = "", ...props }) {
  return (
    <main className={`${className}`} {...props}>
      {children}
    </main>
  );
}
