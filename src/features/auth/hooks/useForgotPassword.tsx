"use client";

import handleAuthErrors from "@/features/auth/utils/handleAuthErrors";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function useForgotPassword() {
  const supabase = createClient();
  const router = useRouter();
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const [isUpdatePasswordLoading, setIsUpdatePasswordLoading] = useState(false);

  async function sendMagicLink(email: string) {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "http://localhost:3000/forgot-password/callback",
          shouldCreateUser: false,
        },
      });
      if (error) throw error;
    } finally {
      setIsMagicLinkLoading(false);
    }
  }

  function handleSendMagicLink(email: string) {
    toast.promise(sendMagicLink(email), {
      loading: "Sending verification code...",
      success: `Verification code sent to ${email}`,
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An error occurred while sending the verification code. Please try again.";
      },
    });
  }

  async function updatePassword(password: string) {
    try {
      setIsUpdatePasswordLoading(true);
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
    } finally {
      setIsUpdatePasswordLoading(false);
    }
  }

  function handleUpdatePassword(password: string) {
    toast.promise(updatePassword(password), {
      loading: "Updating password...",
      success: () => {
        router.push("/");
        return "Password updated successfully";
      },
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An error occurred while updating the password. Please try again.";
      },
    });
  }

  return {
    handleSendMagicLink,
    isMagicLinkLoading,
    handleUpdatePassword,
    isUpdatePasswordLoading,
  };
}
