import Dialog from "./Dialog.jsx";
import "../styles/Modal.css";

export default function Modal ({ children, className = "", isOpen, ...props }) {
  
  if (!isOpen) return null;

  return (
    <Dialog open className={`modal ${className}`} {...props}>
      {children}
    </Dialog>
  );
}
