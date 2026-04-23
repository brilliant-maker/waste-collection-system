import "../styles/Heading.css";

export default function HeadingThree ({ children, className = "", ...props }) {
  return (
    <h3 className={`heading-3 ${className}`} {...props}>
      {children}
    </h3>
  );
}
