import handleAuthErrors from "@/utils/supabase/handleAuthErrors";
import { isAuthApiError } from "@supabase/supabase-js";
import { createSafeActionClient } from "next-safe-action";

const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (isAuthApiError(error)) {
      return handleAuthErrors(error);
    }
    return "An unexpected error occurred. Please try again.";
  },
});

export default actionClient;
