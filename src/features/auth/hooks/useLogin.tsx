import LoginFormSchema from "@/features/auth/types/login";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import z from "zod";

export default function useLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) {
        switch (err.errors[0].code) {
          default:
            toast.error(err.errors[0].longMessage);
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  return { onSubmit, isLoaded };
}
