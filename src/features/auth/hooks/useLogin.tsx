"use client";

import loginAction from "@/features/auth/actions/login";
import { LoginActionSchema } from "@/features/auth/types/login";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import z from "zod";

export default function useLogin() {
  const { executeAsync, isExecuting } = useAction(loginAction);

  async function handleAction(data: z.infer<typeof LoginActionSchema>) {
    const res = await executeAsync(data);
    // Check for server or validation errors and throw them
    if (res?.serverError) throw new Error(res.serverError);
    if (res?.validationErrors) throw new Error(res.validationErrors);
  }

  function handleLogin(data: z.infer<typeof LoginActionSchema>) {
    toast.promise(handleAction(data), {
      loading: "Logging in...",
      success: () => {
        return "Logged in successfully";
      },
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        return "An unexpected error occurred. Please try again.";
      },
    });
  }

  return { handleLogin, isExecuting };
}
