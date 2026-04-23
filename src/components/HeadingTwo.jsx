import "../styles/Heading.css";

export default function HeadingTwo ({ children, className = "", ...props }) {
  return (
    <h2 className={`heading-2 ${className}`} {...props}>
      {children}
    </h2>
  );
}
