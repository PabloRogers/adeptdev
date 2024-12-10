"use client";

import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";

import { toast } from "sonner";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useRegister() {
  const supabase = createClient();

  const handleSignUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Account created successfully!");
    } catch (error) {
      if (isAuthApiError(error)) {
        handleAuthErrors(error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return { handleSignUp };
}
