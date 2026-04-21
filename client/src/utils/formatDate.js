import { DAYS_IT, MONTHS_IT } from "@/constants/dashboardConst";

function formatDate(date) {
  return `${DAYS_IT[date.getDay()]}, ${date.getDate()} ${MONTHS_IT[date.getMonth()]}`;
}

export default formatDate;