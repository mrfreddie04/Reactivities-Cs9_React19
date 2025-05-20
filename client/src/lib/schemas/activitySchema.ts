import { z } from "zod";
import { requiredString } from "../util/util";

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