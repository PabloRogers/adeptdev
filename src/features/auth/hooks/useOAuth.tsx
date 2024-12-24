"use client";

import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { OAuthProvider } from "../types/OAuthProvider";
import handleAuthErrors from "../utils/handleAuthErrors";

export default function useOAuth(provider: OAuthProvider) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithOAuthProvider() {
    try {
      setIsLoading(true);
      const response = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "http://localhost:3000/callback",
        },
      });
      return response;
    } catch (error) {
      setIsLoading(false);
      if (isAuthApiError(error)) {
        return handleAuthErrors(error);
      }
      return "An unexpected error occurred. Please try again.";
    }
  }

  return { handleSignInWithOAuthProvider, isLoading };
}
