"use client";

import LoginFormSchema from "@/features/auth/types/login";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useLogin() {
  const supabase = createClient();
  const router = useRouter();

  async function signUp(formData: z.infer<typeof LoginFormSchema>) {
    const signUpResponse = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    router.refresh();
    return signUpResponse;
  }

  async function handleSignUp(formData: z.infer<typeof LoginFormSchema>) {
    toast.promise(signUp(formData), {
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
    });
  }

  return { handleSignUp };
}
