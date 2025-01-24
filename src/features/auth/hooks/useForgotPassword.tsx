import forgotPasswordAction from "@/features/auth/actions/forgotPassword";

import { ForgotPasswordActionSchema } from "@/features/auth/types/forgotpassword";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { z } from "zod";

export default function useForgotPassword() {
  const { executeAsync, isExecuting } = useAction(forgotPasswordAction);

  async function handleAction(
    data: z.infer<typeof ForgotPasswordActionSchema>,
  ) {
    const res = await executeAsync(data);

    // Check for server or validation errors and throw them
    if (res?.serverError) throw new Error(res.serverError);
    if (res?.validationErrors) throw new Error(res.validationErrors);
  }

  function handleForgotPassword(
    data: z.infer<typeof ForgotPasswordActionSchema>,
  ) {
    toast.promise(handleAction(data), {
      loading: "Sending password reset email...",
      success: `A password reset link has been sent to ${data.email}. Check your inbox or spam folder to proceed.`,
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        return "An unexpected error occurred. Please try again.";
      },
      duration: 60000,
    });
  }

  return { handleForgotPassword, isExecuting };
}
