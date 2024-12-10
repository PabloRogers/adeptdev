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
import GithubOAuth from "@/features/auth/components/GithubOAuth";
import GoogleOAuth from "@/features/auth/components/GoogleOAuth";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  RegisterFormDataSchema,
  RegisterFormStep1Schema,
} from "@/features/auth/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { AuthForm } from "../AuthForm";

export default function RegisterStep1() {
  const multiStepForm = useMultiStepFormContext<RegisterFormDataSchema>();

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
        <GithubOAuth />
        <GoogleOAuth />
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
