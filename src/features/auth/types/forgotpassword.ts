import { z } from "zod";

export type TForgotPasswordFormData = {
  email: string;
  verificationPin: string;
  password: string;
  confirmPassword: string;
};
export const TForgotPasswordFormStep1Schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
});

export const TForgotPasswordFormStep2Schema = z.object({
  verificationPin: z.string().min(5, {
    message: "Username must be at least 2 characters.",
  }),
});

export const TForgotPasswordFormStep3Schema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
