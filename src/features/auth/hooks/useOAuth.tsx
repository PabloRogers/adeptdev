"use client";

import { OAuthProvider } from "@/features/auth/types/OAuthProvider";
import handleAuthErrors from "@/features/auth/utils/handleAuthErrors";
import createClient from "@/utils/supabase/client";
import { isAuthApiError } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";

export default function useOAuth(provider: OAuthProvider) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithOAuthProvider() {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      if (isAuthApiError(error)) {
        handleAuthErrors(error);
      } else {
        toast("An unexpected error occurred. Please try again.");
      }
    }
  }

  return { handleSignInWithOAuthProvider, isLoading };
}
