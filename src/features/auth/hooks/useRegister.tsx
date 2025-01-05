"use client";

import handleAuthErrors from "@/features/auth/utils/handleAuthErrors";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";

export default function useRegister() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function signUp(email: string, password: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/callback",
        },
      });
      setIsLoading(false);
      if (error) throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignUp(email: string, password: string) {
    toast.promise(signUp(email, password), {
      loading: "Sending confirmation email...",
      success: `A confirmation link has been sent to ${email}. Check your inbox or spam folder to proceed.`,
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An unexpected error occurred. Please try again.";
      },
      duration: 30000,
    });
  }

  return { handleSignUp, isLoading };
}
