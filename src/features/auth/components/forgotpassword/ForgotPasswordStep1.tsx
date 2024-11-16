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
  TForgotPasswordFormStep1Schema,
} from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ForgotPasswordStep1() {
  const { handleStep1, isLoaded } = useForgotPassword();
  const multiStepForm = useMultiStepFormContext<TForgotPasswordFormData>();

  const form = useForm<z.infer<typeof TForgotPasswordFormStep1Schema>>({
    resolver: zodResolver(TForgotPasswordFormStep1Schema),
    defaultValues: {
      email: multiStepForm.getMultiFormData().email,
    },
  });

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Forgot Password</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter your email to reset your password
        </FormHeader.SubHeader>
      </FormHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleStep1)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
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
          <div className="mt-4 text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
