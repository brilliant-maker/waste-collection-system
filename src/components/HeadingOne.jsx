import "../styles/Heading.css";

export default function HeadingOne ({ children, className = "", ...props }) {
  return (
    <h1 className={`heading-1 ${className}`} {...props}>
      {children}
    </h1>
  );
}
