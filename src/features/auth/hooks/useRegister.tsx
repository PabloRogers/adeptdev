"use client";

import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { toast } from "sonner";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useRegister() {
  const supabase = createClient();

  async function signUp(email: string, password: string) {
    const signUpResponse = await supabase.auth.signUp({
      email,
      password,
    });
    return signUpResponse;
  }

  async function handleSignUp(email: string, password: string) {
    toast.promise(signUp(email, password), {
      loading: "Sending confirmation email...",
      success: ({ error }) => {
        if (error) throw error;

        return `A confirmation link has been sent to ${email}. Check your inbox or spam folder to proceed.`;
      },
      error: (error) => {
        if (isAuthApiError(error)) {
          return handleAuthErrors(error);
        }
        return "An unexpected error occurred. Please try again.";
      },
      duration: 30000,
    });
  }

  return { handleSignUp };
}
