"use client";

import IconLoadingButton from "@/components/IconLoadingButton";
import TogglePasswordInput from "@/components/TogglePasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthForm from "@/features/auth/components/AuthForm";
import useUpdatePassword from "@/features/auth/hooks/useUpdatePassword";
import { UpdatePasswordFormSchema } from "@/features/auth/types/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogIn } from "react-feather";
import { useForm } from "react-hook-form";
import z from "zod";

export default function UpdatePasswordForm() {
  const { handleUpdatePassword, isExecuting } = useUpdatePassword();

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdatePasswordFormSchema>) {
    handleUpdatePassword({ password: data.newPassword });
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
                  <TogglePasswordInput
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
                  <TogglePasswordInput
                    placeholder="Confirm Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <IconLoadingButton
            text="Continue"
            Icon={LogIn}
            isExecuting={isExecuting}
            className="w-full"
          />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/" className="underline">
              Dashboard
            </Link>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
}
