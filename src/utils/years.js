import currentYear from "./currentYear.js";

export default function years() {
  const range = 5;
  
  return Array.from({ length: range * 2 + 1 }, (_, i) => {
    return currentYear() - range + i;
  });
}
