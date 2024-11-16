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
import useRegister from "@/features/auth/hooks/useRegister";
import {
  TRegisterFormData,
  TRegisterFormStep3Schema,
} from "@/features/auth/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterFormStep3() {
  const { handleStep3, isLoaded } = useRegister();
  const multiStepForm = useMultiStepFormContext<TRegisterFormData>();

  const form = useForm<z.infer<typeof TRegisterFormStep3Schema>>({
    resolver: zodResolver(TRegisterFormStep3Schema),
    defaultValues: {
      verificationPin: multiStepForm.getMultiFormData().verificationPin,
    },
  });

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Verify Your Email</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter the verification code sent to your email
        </FormHeader.SubHeader>
      </FormHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleStep3)}
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
    </>
  );
}
