export default function Dialog ({ children, className = "", ...props }) {
  return (
    <dialog className={`${className}`} {...props}>
      {children}
    </dialog>
  );
}
