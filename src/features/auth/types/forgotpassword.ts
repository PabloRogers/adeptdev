import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
});

export const ForgotPasswordActionSchema = z.object({
  email: z.string().email(),
});
