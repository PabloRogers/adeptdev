import handleAuthErrors from "@/utils/supabase/handleAuthErrors";
import createClient from "@/utils/supabase/server";
import { isAuthApiError } from "@supabase/supabase-js";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const unauthenticatedAction = createSafeActionClient({
  handleServerError: (error) => {
    if (isAuthApiError(error)) {
      return handleAuthErrors(error);
    }
    return "An unexpected error occurred. Please try again.";
  },
});

export const authenticatedAction = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }

    return "An unexpected server error occurred. Please try again.";
  },
}).use(async ({ next }) => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user) throw new ActionError("Not authenticated to perform this action.");

  return next({ ctx: { user: user.data.user } });
});
