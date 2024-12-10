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
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:3000/forgot-password/update",
      });

      if (error) throw error;

      toast.info(
        "We’ve sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password. If you don’t see the email, check your spam or junk folder.",
        { duration: 15000 },
      );
    } catch (error) {
      if (isAuthApiError(error)) {
        handleAuthErrors(error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleUpdatePassword = async (
    data: z.infer<typeof UpdatePasswordSchema>,
  ) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      toast.success("Password updated successfully!");
    } catch (error) {
      if (isAuthApiError(error)) {
        handleAuthErrors(error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return { handleResetPasswordForEmail, handleUpdatePassword };
}
