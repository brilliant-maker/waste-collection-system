import { useEffect, useRef, useState } from "react";
import "../styles/Toast.css";

let pushToast;
let toastCounter = 0;

function generateId() {
  toastCounter += 1;
  return `toast-${toastCounter}`;
}

export function showToast(message, type = "info") {
  if (!pushToast) {
    console.warn("Toast not mounted yet");
    return;
  }
  pushToast({ message, type });
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Set());

  useEffect(() => {
    pushToast = (t) => {
      const id = generateId();

      setToasts((prev) => [...prev, { id, ...t }]);

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
        timers.current.delete(timer);
      }, 3000);

      timers.current.add(timer);
    };

    return () => {
      /* Important cleanup */
      pushToast = null;

      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, []);

  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
