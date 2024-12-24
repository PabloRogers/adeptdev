"use client";

import LoginFormSchema from "@/features/auth/types/login";
import handleAuthErrors from "@/features/auth/utils/handleAuthErrors";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function useLogin() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function signUp(formData: z.infer<typeof LoginFormSchema>) {
    const signUpResponse = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    router.refresh();
    return signUpResponse;
  }

  async function handleSignUp(formData: z.infer<typeof LoginFormSchema>) {
    setIsLoading(true);
    toast.promise(signUp(formData), {
      loading: "Logging in...",
      success: ({ error }) => {
        setIsLoading(false);
        if (error) throw error;
        return "Login successful!";
      },
      error: (error) => {
        setIsLoading(false);
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An unexpected error occurred. Please try again.";
      },
    });
  }

  return { handleSignUp, isLoading };
}
