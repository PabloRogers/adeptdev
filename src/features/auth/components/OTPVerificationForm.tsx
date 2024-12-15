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
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  RegisterFormDataSchema,
  RegisterFormStep3Schema,
} from "@/features/auth/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthForm } from "./AuthForm";

export default function OTPVerificationForm() {
  const multiStepForm = useMultiStepFormContext<RegisterFormDataSchema>();

  const form = useForm<z.infer<typeof RegisterFormStep3Schema>>({
    resolver: zodResolver(RegisterFormStep3Schema),
    defaultValues: {
      verificationPin: multiStepForm.getData().verificationPin,
    },
  });

  function onSubmit(data: z.infer<typeof RegisterFormStep3Schema>) {
    multiStepForm.setData(data);
  }

  return (
    <AuthForm>
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Verify Your Email</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Enter the verification code sent to your email
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center space-y-6"
        >
          <FormField
            control={form.control}
            name="verificationPin"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center space-y-4">
                <FormLabel>Verification Code</FormLabel>
                <FormControl
                  onChange={() => {
                    multiStepForm.setData({
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
          <AuthForm.SubmitButton
            disabled={form.formState.isSubmitting}
            isloading={form.formState.isSubmitting}
          >
            Continue
          </AuthForm.SubmitButton>
        </form>
      </Form>
    </AuthForm>
  );
}
