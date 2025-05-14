import { z } from "zod";

const requiredString = (fieldName: string) => {
  const message = `${fieldName} is required`;
  return z.string({ required_error: message}).min(1,{ message });
}

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Desription'),
  category: requiredString('Category'),
  date: z.coerce.date({
    message: 'Date is required'
  }),

  // city: requiredString('City'),
  // venue: requiredString('Venue'),
  location: z.object({
    venue: requiredString('Venue'), 
    city: z.string().optional(),
    latitude:  z.coerce.number(),
    longitude: z.coerce.number(),
  })
});

export type ActivitySchema = z.infer<typeof activitySchema>;
//export type ActivitySchema = z.infer<typeof activitySchema>;