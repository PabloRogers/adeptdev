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
import AuthForm from "@/features/auth/components/AuthForm";
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import { ForgotPasswordFormStep1Schema } from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ForgotPasswordFrom() {
  const { handleResetPasswordForEmail } = useForgotPassword();

  const form = useForm<z.infer<typeof ForgotPasswordFormStep1Schema>>({
    resolver: zodResolver(ForgotPasswordFormStep1Schema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof ForgotPasswordFormStep1Schema>) {
    handleResetPasswordForEmail({ email: data.email });
  }

  return (
    <AuthForm>
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Forgot Password</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Please provide the email address associated with your account.
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
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
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
}
