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
import { Input } from "@/components/ui/input";
import AuthForm from "@/features/auth/components/AuthForm";
import OAuthButton from "@/features/auth/components/OAuthButton";
import useLogin from "@/features/auth/hooks/useLogin";
import { LoginFormSchema } from "@/features/auth/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogIn } from "react-feather";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

export default function LoginForm() {
  const { handleLogin, isExecuting } = useLogin();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <AuthForm data-testid="LoginForm">
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Login</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Login with social providers or email and password.
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
      <div className="space-y-2">
        <OAuthButton
          provider="github"
          Icon={FaGithub}
          text="Sign in with Github"
        />
        <OAuthButton
          provider="google"
          Icon={FcGoogle}
          text="Sign in with Google"
        />
      </div>
      <AuthForm.Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
                  <TogglePasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <IconLoadingButton
            text="Login"
            Icon={LogIn}
            isExecuting={isExecuting}
            className="w-full"
          />
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
