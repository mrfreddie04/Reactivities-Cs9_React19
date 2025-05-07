import { DateArg, format } from "date-fns";

export function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function formatDate(date: DateArg<Date>) {
  return format(date, "dd MMM yyyy h:mm a");
}