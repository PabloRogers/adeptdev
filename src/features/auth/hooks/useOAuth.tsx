"use client";

import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { OAuthProvider } from "../types/OAuthProvider";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useOAuth(provider: OAuthProvider) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  async function signInWithOAuthProvider() {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "http://localhost:3000/callback",
        },
      });

      if (error) throw error;
    } catch (error) {
      if (isAuthApiError(error)) {
        handleAuthErrors(error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }

    setIsLoading(false);
  }
  return { isLoading, signInWithOAuthProvider };
}
