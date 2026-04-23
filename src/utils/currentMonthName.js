import MONTH_NAMES from "../constants/MONTH_NAMES.js";

export default function currentMonthName() {
  return MONTH_NAMES[new Date().getMonth()];
}
