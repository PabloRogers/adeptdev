import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export default function GoogleOAuth() {
  const { handleSignInWithOAuthProvider } = useOAuth("google");
  const form = useForm();

  async function onSubmit() {
    await handleSignInWithOAuthProvider();
  }

  return (
    <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <Button
        variant="outline"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
        {!form.formState.isSubmitting && <FcGoogle className="mr-2 h-5 w-5" />}
        Sign in with Google
      </Button>
    </form>
  );
}
