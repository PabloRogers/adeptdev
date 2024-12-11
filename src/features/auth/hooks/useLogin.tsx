"use client";

import LoginFormSchema from "@/features/auth/types/login";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { toast } from "sonner";
import z from "zod";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useLogin() {
  const supabase = createClient();

  async function handleSignUp(formData: z.infer<typeof LoginFormSchema>) {
    toast.promise(
      supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      }),
      {
        loading: "Logging in...",
        success: ({ error }) => {
          if (error) throw error;
          return "Login successful!";
        },
        error: (error) => {
          if (isAuthApiError(error)) {
            return handleAuthErrors(error);
          }
          return "An unexpected error occurred. Please try again.";
        },
      },
    );
  }

  return { handleSignUp };
}
