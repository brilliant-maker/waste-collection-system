import Paragraph from "./Paragraph.jsx";

export default function Text ({ children, className = "", ...props }) {
  return (
    <Paragraph className={`${className}`} {...props}>
      {children}
    </Paragraph>
  );
}
