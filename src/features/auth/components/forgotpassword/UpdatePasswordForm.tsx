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
import { UpdatePasswordFormSchema } from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function UpdatePasswordForm() {
  const { handleUpdatePassword, isUpdatePasswordLoading } = useForgotPassword();

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdatePasswordFormSchema>) {
    handleUpdatePassword(data.confirmPassword);
  }

  return (
    <AuthForm data-testid="UpdatePasswordForm">
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Update Password</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Enter your new password to reset your password.
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
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
          <AuthForm.SubmitButton isloading={isUpdatePasswordLoading}>
            Reset Password
          </AuthForm.SubmitButton>
        </form>
      </Form>
    </AuthForm>
  );
}
