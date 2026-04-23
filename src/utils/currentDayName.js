import DAY_NAMES from "../constants/DAY_NAMES.js";

export default function currentDayName() {
  return DAY_NAMES[new Date().getDay()];
}
