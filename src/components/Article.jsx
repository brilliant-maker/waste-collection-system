export default function Article ({ children, className = "", ...props }) {
  return (
    <article className={`${className}`} {...props}>
      {children}
    </article>
  );
}
