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
import FormSubmitButton from "@/features/auth/components/FormSubmitButton";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  TForgotPasswordFormData,
  TForgotPasswordFormStep2Schema,
} from "@/features/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordStep2() {
  const multiStepForm = useMultiStepFormContext<TForgotPasswordFormData>();

  const form = useForm<z.infer<typeof TForgotPasswordFormStep2Schema>>({
    resolver: zodResolver(TForgotPasswordFormStep2Schema),
    defaultValues: {
      verificationPin: multiStepForm.getMultiFormData().verificationPin,
    },
  });

  async function onSubmit(
    data: z.infer<typeof TForgotPasswordFormStep2Schema>,
  ) {
    multiStepForm.setMultiFormData({
      verificationPin: data.verificationPin,
    });

    multiStepForm.nextStep();
  }

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      if (value.verificationPin?.length === 6) {
        form.handleSubmit(onSubmit)();
      }
    });
    return () => unsubscribe();
  }, [form.watch]);

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email address to reset your password.
        </p>
      </div>
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

          <FormSubmitButton isloading={form.formState.isLoading}>
            Continue
          </FormSubmitButton>
        </form>
      </Form>
    </>
  );
}
