"use server";

import { ForgotPasswordActionSchema } from "@/features/auth/types/forgotpassword";
import { unauthenticatedAction } from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";

const forgotPasswordAction = unauthenticatedAction
  .schema(ForgotPasswordActionSchema, {
    handleValidationErrorsShape: async () =>
      "Invalid form data. Please check your input and try again.",
  })
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://www.adeptdev.io/forgot-password/callback",
        shouldCreateUser: false,
      },
    });
    if (error) throw error;
  });

export default forgotPasswordAction;
