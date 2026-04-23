import Article from "./Article.jsx";
import "../styles/Card.css";

export default function Card ({ children, className = "", ...props }) {
  return (
    <Article className={`card ${className}`} {...props}>
      {children}
    </Article>
  );
}
