"use client";

import LoginFormSchema from "@/features/auth/types/login";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useLogin() {
  const router = useRouter();

  async function handleSignUp(formData: z.infer<typeof LoginFormSchema>) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      if (isAuthApiError(error)) {
        handleAuthErrors(error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  return { handleSignUp };
}
