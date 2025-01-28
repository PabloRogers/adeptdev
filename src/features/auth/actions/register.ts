"use server";

import { RegisterActionSchema } from "@/features/auth/types/register";
import { unauthenticatedAction } from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";

const registerAction = unauthenticatedAction
  .schema(RegisterActionSchema, {
    handleValidationErrorsShape: async () =>
      "Invalid form data. Please check your input and try again.",
  })
  .action(
    async ({ parsedInput: { email, password, first_name, last_name } }) => {
      const supabase = await createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://www.adeptdev.io/callback",
          data: {
            first_name,
            last_name,
          },
        },
      });
      if (error) throw error;
    },
  );

export default registerAction;
