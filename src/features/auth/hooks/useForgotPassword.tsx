import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  ForgotPasswordFormDataSchema,
  ForgotPasswordFormStep1Schema,
  ForgotPasswordFormStep2Schema,
  ForgotPasswordFormStep3Schema,
} from "@/features/auth/types/forgotpassword";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import { z } from "zod";

export default function useForgotPassword() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const multiStepForm = useMultiStepFormContext<ForgotPasswordFormDataSchema>();

  const handleStep1 = async (
    data: z.infer<typeof ForgotPasswordFormStep1Schema>,
  ) => {
    multiStepForm.setMultiFormData({ email: data.email });

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: data.email,
      })
      .then(() => {
        toast.info("Check your email for the reset code.");
        multiStepForm.nextStep();
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          switch (err.errors[0].code) {
            default:
              toast.error(err.errors[0].code);
              break;
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };
  async function handleStep2(
    data: z.infer<typeof ForgotPasswordFormStep2Schema>,
  ) {
    multiStepForm.setMultiFormData({
      verificationPin: data.verificationPin,
    });

    multiStepForm.nextStep();
  }

  async function handleStep3(
    data: z.infer<typeof ForgotPasswordFormStep3Schema>,
  ) {
    multiStepForm.setMultiFormData({
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: multiStepForm.getMultiFormData().verificationPin,
        password: data.password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          toast.info("Need to verify second factor");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          switch (err.errors[0].code) {
            case "form_code_incorrect":
              multiStepForm.backStep();
              toast.error(err.errors[0].longMessage);
              break;
            default:
              toast.error(err.errors[0].longMessage);
              break;
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  }
  return { handleStep1, handleStep2, handleStep3, isLoaded };
}
