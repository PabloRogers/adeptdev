import updatePasswordAction from "@/features/auth/actions/updatePassword";
import { UpdatePasswordActionSchema } from "@/features/auth/types/updatePassword";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import z from "zod";

export default function useUpdatePassword() {
  const { executeAsync, isExecuting } = useAction(updatePasswordAction);

  async function handleAction(
    data: z.infer<typeof UpdatePasswordActionSchema>,
  ) {
    const res = await executeAsync(data);
    // Check for server or validation errors and throw them
    if (res?.serverError) throw new Error(res.serverError);
    if (res?.validationErrors) throw new Error(res.validationErrors);
  }

  function handleUpdatePassword(
    data: z.infer<typeof UpdatePasswordActionSchema>,
  ) {
    toast.promise(handleAction(data), {
      loading: "Updating password...",
      success: "Password updated successfully",
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        return "An unexpected error occurred. Please try again.";
      },
    });
  }

  return { handleUpdatePassword, isExecuting };
}
