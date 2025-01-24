"use client";

import signOutAction from "@/features/auth/actions/signOut";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export default function useSignOut() {
  const { executeAsync, isExecuting } = useAction(signOutAction);

  async function handleSignOut() {
    toast.promise(executeAsync, {
      loading: "Signing out...",
      success: "You have been signed out.",
      error: (error) => {
        return error;
      },
    });
  }

  return { handleSignOut, isExecuting };
}
