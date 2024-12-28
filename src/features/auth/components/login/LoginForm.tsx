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
import GithubOAuth from "@/features/auth/components/GithubOAuth";
import GoogleOAuth from "@/features/auth/components/GoogleOAuth";
import useLogin from "@/features/auth/hooks/useLogin";
import LoginFormSchema from "@/features/auth/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

export default function LoginForm() {
  const { handleSignUp, isLoading } = useLogin();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthForm>
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Login</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Login with social providers or email and password.
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
      <div className="space-y-2">
        <GithubOAuth />
        <GoogleOAuth />
      </div>
      <AuthForm.Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password/email"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <AuthForm.PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthForm.SubmitButton isloading={isLoading}>
            Login
          </AuthForm.SubmitButton>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
}
