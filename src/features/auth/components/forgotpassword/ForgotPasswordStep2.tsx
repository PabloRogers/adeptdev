"use client";

import {
  Form,
  FormControl,
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
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import {
  TForgotPasswordFormData,
  TForgotPasswordFormStep2Schema,
} from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordStep2() {
  const { handleStep2, isLoaded } = useForgotPassword();
  const multiStepForm = useMultiStepFormContext<TForgotPasswordFormData>();

  const form = useForm<z.infer<typeof TForgotPasswordFormStep2Schema>>({
    resolver: zodResolver(TForgotPasswordFormStep2Schema),
    defaultValues: {
      verificationPin: multiStepForm.getMultiFormData().verificationPin,
    },
  });

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Forgot Password</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter the verification code sent to your email.
        </FormHeader.SubHeader>
      </FormHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleStep2)}
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSubmitButton
            disabled={isLoaded}
            isloading={form.formState.isLoading}
          >
            Continue
          </FormSubmitButton>
        </form>
      </Form>
    </>
  );
}
