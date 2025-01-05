import { z } from "zod";

export type ForgotPasswordSchema = {
  email: string;
  oneTimePassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ForgotPasswordFormStep1Schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
});

export const OTPVerificationFormSchema = z.object({
  oneTimePassword: z.string().min(5, {
    message: "Username must be at least 2 characters.",
  }),
});

export const UpdatePasswordFormSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
