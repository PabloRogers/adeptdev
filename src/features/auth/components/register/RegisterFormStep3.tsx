"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import FormHeader from "@/features/auth/components/FormHeader";
import FormSubmitButton from "@/features/auth/components/FormSubmitButton";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  TRegisterFormData,
  TRegisterFormStep3Schema,
} from "@/features/auth/types/register";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterFormStep3() {
  const multiStepForm = useMultiStepFormContext<TRegisterFormData>();
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<z.infer<typeof TRegisterFormStep3Schema>>({
    resolver: zodResolver(TRegisterFormStep3Schema),
    defaultValues: {
      verificationPin: multiStepForm.getMultiFormData().verificationPin,
    },
  });

  async function onSubmit(data: z.infer<typeof TRegisterFormStep3Schema>) {
    multiStepForm.setMultiFormData({
      verificationPin: form.getValues("verificationPin"),
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

  return (
    <div className="w-full flex flex-col items-center">
      <FormHeader>
        <FormHeader.MainHeader>Verify Your Email</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter the verification code sent to your email
        </FormHeader.SubHeader>
      </FormHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="verificationPin"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center w-full justify-center space-y-4">
                <FormLabel>Verification Code</FormLabel>
                <FormControl
                  onChange={() => {
                    multiStepForm.setMultiFormData({
                      verificationPin: form.getValues("verificationPin"),
                    });
                  }}
                >
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-center">
                  Please enter the verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSubmitButton
            disabled={isLoaded}
            isloading={form.formState.isSubmitting}
          >
            Continue
          </FormSubmitButton>
        </form>
      </Form>
    </div>
  );
}
