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
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import { UpdatePasswordSchema } from "@/features/auth/types/forgotpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { AuthForm } from "../AuthForm";

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
    <AuthForm>
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
