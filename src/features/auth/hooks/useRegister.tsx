import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  TRegisterFormData,
  TRegisterFormStep1Schema,
  TRegisterFormStep2Schema,
  TRegisterFormStep3Schema,
} from "@/features/auth/types/register";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import { z } from "zod";

export default function useRegister() {
  const multiStepForm = useMultiStepFormContext<TRegisterFormData>();
  const { isLoaded, signUp, setActive } = useSignUp();

  const handleStep1 = async (
    data: z.infer<typeof TRegisterFormStep1Schema>,
  ) => {
    multiStepForm.setMultiFormData({ email: data.email });

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
      });
      multiStepForm.nextStep();
    } catch (err) {
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
  };

  async function handleStep2(data: z.infer<typeof TRegisterFormStep2Schema>) {
    multiStepForm.setMultiFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: multiStepForm.getMultiFormData().email,
        password: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.info("A verification code has been sent to your email address.");
      multiStepForm.nextStep();
    } catch (err) {
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

  async function handleStep3(data: z.infer<typeof TRegisterFormStep3Schema>) {
    multiStepForm.setMultiFormData({
      verificationPin: data.verificationPin,
    });

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.verificationPin,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        toast.error("Status is not complete. Please try again.");
      }
    } catch (err) {
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
  return { handleStep1, handleStep2, handleStep3, isLoaded };
}
