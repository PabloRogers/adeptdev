"use client";

import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { OAuthProvider } from "../types/OAuthProvider";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useOAuth(provider: OAuthProvider) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithOAuthProvider() {
    const response = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/callback",
      },
    });

    return response;
  }

  async function handleSignInWithOAuthProvider() {
    setIsLoading(true);
    toast.promise(signInWithOAuthProvider(), {
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
  return { handleSignInWithOAuthProvider, isLoading };
}
