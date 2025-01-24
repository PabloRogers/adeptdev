"use client";

import OAuthAction from "@/features/auth/actions/OAuth";
import OAuthProvidersSchema from "@/features/auth/types/OAuth";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import z from "zod";

export default function useOAuth(
  provider: z.infer<typeof OAuthProvidersSchema>,
) {
  const { executeAsync, isExecuting } = useAction(OAuthAction);

  async function handleOAuthSignIn() {
    const res = await executeAsync(provider);
    if (res?.serverError)
      toast.error("An unexpected error occurred. Please try again.");

    if (res?.validationErrors)
      toast.error("Schema validation error occurred. Please try again.");
  }

  return { handleOAuthSignIn, isExecuting };
}
