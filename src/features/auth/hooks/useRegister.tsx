"use client";

import register from "@/features/auth/actions/register";
import { RegisterActionSchema } from "@/features/auth/types/register";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import z from "zod";

export default function useRegister() {
  const { executeAsync, isExecuting } = useAction(register);

  async function handleAction(data: z.infer<typeof RegisterActionSchema>) {
    const res = await executeAsync(data);
    // Check for server or validation errors and throw them
    if (res?.serverError) throw new Error(res.serverError);
    if (res?.validationErrors) throw new Error(res.validationErrors);
  }

  async function handleRegister(data: z.infer<typeof RegisterActionSchema>) {
    toast.promise(handleAction(data), {
      loading: "Sending confirmation email...",
      success: `A confirmation link has been sent to ${data.email}. Check your inbox or spam folder to proceed.`,
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        return "An unexpected error occurred. Please try again.";
      },
      duration: 30000,
    });
  }

  return { handleRegister, isExecuting };
}
