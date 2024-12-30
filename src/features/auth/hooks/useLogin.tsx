"use client";

import LoginFormSchema from "@/features/auth/types/login";
import handleAuthErrors from "@/features/auth/utils/handleAuthErrors";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function useLogin() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function signUp(formData: z.infer<typeof LoginFormSchema>) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    setIsLoading(false);
    if (error) throw error;
  }

  async function handleSignUp(formData: z.infer<typeof LoginFormSchema>) {
    toast.promise(signUp(formData), {
      loading: "Logging in...",
      success: "Login successful!",
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An unexpected error occurred. Please try again.";
      },
    });
  }

  return { handleSignUp, isLoading };
}
