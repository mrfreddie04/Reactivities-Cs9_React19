import { z } from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
  displayName: requiredString("Display name"),
  email: z.string().email(), 
  password: requiredString("Password")
});

export type RegisterSchema = z.infer<typeof registerSchema>;