"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthForm from "@/features/auth/components/AuthForm";
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import { UpdatePasswordSchema } from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function UpdatePasswordForm() {
  const { handleUpdatePassword } = useForgotPassword();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <AuthForm data-testid="UpdatePasswordForm">
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Update Password</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Enter your new password to reset your password.
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdatePassword)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <AuthForm.PasswordInput
                    placeholder="Enter your new password"
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
                  <AuthForm.PasswordInput
                    placeholder="Confirm Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthForm.SubmitButton
            disabled={form.formState.isSubmitting}
            isloading={form.formState.isSubmitting}
          >
            Reset Password
          </AuthForm.SubmitButton>
        </form>
      </Form>
    </AuthForm>
  );
}
