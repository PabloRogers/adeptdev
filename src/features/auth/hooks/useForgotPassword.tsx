"use client";

import {
  ForgotPasswordFormStep1Schema,
  UpdatePasswordSchema,
} from "@/features/auth/types/forgotpassword";
import handleAuthErrors from "@/features/auth/utils/handleAuthErrors";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function useForgotPassword() {
  const supabase = createClient();
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  async function resetPassword(
    data: z.infer<typeof ForgotPasswordFormStep1Schema>,
  ) {
    try {
      setIsResetLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "http://localhost:3000/callback",
      });
      if (error) throw error;
    } finally {
      setIsResetLoading(false);
    }
  }

  function handleResetPassword(
    data: z.infer<typeof ForgotPasswordFormStep1Schema>,
  ) {
    toast.promise(resetPassword(data), {
      loading: "Sending password reset email...",
      success: `A password reset link has been sent to ${data.email}. Check your inbox or spam folder to proceed.`,
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An unexpected error occurred. Please try again.";
      },
    });
  }

  async function updatePassword(data: z.infer<typeof UpdatePasswordSchema>) {
    try {
      setIsUpdateLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;
    } finally {
      setIsUpdateLoading(false);
    }
  }

  function handleUpdatePassword(data: z.infer<typeof UpdatePasswordSchema>) {
    toast.promise(updatePassword(data), {
      loading: "Updating password...",
      success: "Password updated successfully!",
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An unexpected error occurred. Please try again.";
      },
    });
  }

  return {
    handleResetPassword,
    isResetLoading,
    handleUpdatePassword,
    isUpdateLoading,
  };
}
