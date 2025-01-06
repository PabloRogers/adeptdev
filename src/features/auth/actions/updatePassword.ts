"use server";

import { UpdatePasswordActionSchema } from "@/features/auth/types/updatePassword";
import actionClient from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const updatePasswordAction = actionClient
  .schema(UpdatePasswordActionSchema, {
    handleValidationErrorsShape: async () =>
      "Invalid form data. Please check your input and try again.",
  })
  .action(async ({ parsedInput: { password } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw error;
    } else {
      redirect("/");
    }
  });

export default updatePasswordAction;
