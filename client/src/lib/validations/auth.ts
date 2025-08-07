import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must include at least one number" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Must include at least one special character",
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: passwordSchema,
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
