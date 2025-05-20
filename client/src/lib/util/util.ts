import { DateArg, format } from "date-fns";
import { z } from "zod";

export function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function formatDate(date: DateArg<Date>) {
  return format(date, "dd MMM yyyy h:mm a");
}

export const requiredString = (fieldName: string) => {
  const message = `${fieldName} is required`;
  return z.string({ required_error: message}).min(1,{ message });
}
