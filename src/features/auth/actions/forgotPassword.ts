"use server";

import { ForgotPasswordActionSchema } from "@/features/auth/types/forgotPassword";
import actionClient from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";

const forgotPasswordAction = actionClient
  .schema(ForgotPasswordActionSchema, {
    handleValidationErrorsShape: async () =>
      "Invalid form data. Please check your input and try again.",
  })
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/forgot-password/callback",
        shouldCreateUser: false,
      },
    });
    if (error) throw error;
  });

export default forgotPasswordAction;
