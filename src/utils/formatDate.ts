import { format } from "date-fns";

export const formatDateToStr = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = format(date, "MMMM");
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
