"use client";

import {
  ForgotPasswordFormStep1Schema,
  UpdatePasswordSchema,
} from "@/features/auth/types/forgotpassword";
import createClient from "@/utils/supabase/client";
import { toast } from "sonner";

import { isAuthApiError } from "@supabase/supabase-js";
import { z } from "zod";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useForgotPassword() {
  const supabase = createClient();

  const handleResetPasswordForEmail = async (
    data: z.infer<typeof ForgotPasswordFormStep1Schema>,
  ) => {
    toast.promise(
      supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:3000/forgot-password/update",
      }),
      {
        loading: "Sending password reset email...",
        success: ({ error }) => {
          if (error) throw error;

          return `A password reset link has been sent to ${data.email}. Check your inbox or spam folder to proceed.`;
        },
        error: (error) => {
          if (isAuthApiError(error)) {
            return handleAuthErrors(error);
          }
          return "An unexpected error occurred. Please try again.";
        },
      },
    );
  };

  const handleUpdatePassword = async (
    data: z.infer<typeof UpdatePasswordSchema>,
  ) => {
    toast.promise(
      supabase.auth.updateUser({
        password: data.password,
      }),
      {
        loading: "Updating password...",
        success: ({ error }) => {
          if (error) throw error;

          return "Password updated successfully!";
        },
        error: (error) => {
          if (isAuthApiError(error)) {
            return handleAuthErrors(error);
          }
          return "An unexpected error occurred. Please try again.";
        },
      },
    );
  };

  return { handleResetPasswordForEmail, handleUpdatePassword };
}
