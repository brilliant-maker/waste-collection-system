import { useEffect, useState, useMemo } from "react";

export default function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setTime(new Date());

    // Align to the next exact minute
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;

    let interval;

    const timeout = setTimeout(() => {
      updateTime();
      interval = setInterval(updateTime, 60000);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  // Memoized values - clean and stable
  const timeValues = useMemo(() => ({
    time,
    currentHour: time.getHours(),     // 0-23
    currentMinute: time.getMinutes()  // 0-59
  }), [time]);

  return timeValues;
}
