"use server";

import OAuthProvidersSchema from "@/features/auth/types/OAuth";
import actionClient from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const OAuthAction = actionClient
  .schema(OAuthProvidersSchema, {
    handleValidationErrorsShape: async () =>
      "Invalid OAuth provider. Please try again.",
  })
  .action(async ({ parsedInput: provider }) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/callback",
      },
    });
    if (error) {
      throw error;
    } else {
      redirect(data.url);
    }
  });

export default OAuthAction;
