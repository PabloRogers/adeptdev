"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormHeader from "@/features/auth/components/FormHeader";
import FormSubmitButton from "@/features/auth/components/FormSubmitButton";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import {
  TForgotPasswordFormData,
  TForgotPasswordFormStep3Schema,
} from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ForgotPasswordStep3() {
  const { handleStep3, isLoaded } = useForgotPassword();
  const multiStepForm = useMultiStepFormContext<TForgotPasswordFormData>();

  const form = useForm<z.infer<typeof TForgotPasswordFormStep3Schema>>({
    resolver: zodResolver(TForgotPasswordFormStep3Schema),
    defaultValues: {
      password: multiStepForm.getMultiFormData().password,
      confirmPassword: multiStepForm.getMultiFormData().confirmPassword,
    },
  });

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Forgot Password</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter your new password to reset your password.
        </FormHeader.SubHeader>
      </FormHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleStep3)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSubmitButton
            disabled={isLoaded}
            isloading={form.formState.isSubmitting}
          >
            Reset Password
          </FormSubmitButton>
        </form>
      </Form>
    </>
  );
}
