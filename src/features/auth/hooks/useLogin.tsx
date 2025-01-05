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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function login(formData: z.infer<typeof LoginFormSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(formData: z.infer<typeof LoginFormSchema>) {
    toast.promise(Promise.resolve(login(formData)), {
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

  return { handleLogin, login, isLoading };
}
