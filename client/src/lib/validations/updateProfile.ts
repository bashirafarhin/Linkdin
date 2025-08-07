import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  bio: z
    .string()
    .transform((val) => val.trim())
    .refine((val) => val === "" || val.length <= 100, {
      message: "Bio must be at most 100 characters",
    }),
});
