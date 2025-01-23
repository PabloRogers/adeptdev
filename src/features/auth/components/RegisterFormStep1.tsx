"use client";

import IconLoadingButton from "@/components/IconLoadingButton";
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
import {
  RegisterFormStep1Schema,
  RegisterMultiStepFormSchema,
} from "@/features/auth/types/register";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogIn } from "react-feather";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

export default function RegisterFormStep1() {
  const multiStepForm =
    useMultiStepFormContext<z.infer<typeof RegisterMultiStepFormSchema>>();

  const form = useForm<z.infer<typeof RegisterFormStep1Schema>>({
    resolver: zodResolver(RegisterFormStep1Schema),
    defaultValues: {
      email: multiStepForm.getData().email,
    },
  });

  function onSubmit(data: z.infer<typeof RegisterFormStep1Schema>) {
    multiStepForm.setData(data);
    multiStepForm.nextStep();
  }

  return (
    <AuthForm>
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Create Your Account</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Register with social providers or email.
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <IconLoadingButton
            text="Continue"
            Icon={LogIn}
            isExecuting={form.formState.isSubmitting}
            className="w-full"
          />
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
