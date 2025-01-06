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

import { ForgotPasswordFormSchema } from "@/features/auth/types/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const { handleForgotPassword, isExecuting } = useForgotPassword();

  async function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
    handleForgotPassword(data);
  }
  return (
    <AuthForm data-testid="ForgotPasswordForm">
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
          <AuthForm.SubmitButton isloading={isExecuting}>
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
