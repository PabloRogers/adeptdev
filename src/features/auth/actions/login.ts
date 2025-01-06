"use server";

import { LoginActionSchema } from "@/features/auth/types/login";
import actionClient from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const loginAction = actionClient
  .schema(LoginActionSchema, {
    handleValidationErrorsShape: async () =>
      "Invalid form data. Please check your input and try again.",
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    } else {
      redirect("/");
    }
  });

export default loginAction;
