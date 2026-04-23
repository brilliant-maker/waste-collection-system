export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  return {
    date: date.getDate(),
    year: date.getFullYear(),
    monthNumber: date.getMonth(),
    dayNumber: date.getDate(),

    shortDayName: date.toLocaleString(undefined, { weekday: 'short' }),
    shortMonthName: date.toLocaleString(undefined, { month: 'short' }),

    longDayName: date.toLocaleString(undefined, { weekday: 'long' }),
    longMonthName: date.toLocaleString(undefined, { month: 'long' }),

    datePart: date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),

    timePart12Hours: date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }),

    timePart24Hours: date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }),

    full: date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
}
