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
import FormHeader from "@/features/auth/components/FormHeader";
import FormSeparater from "@/features/auth/components/FormSeparater";
import FormSubmitButton from "@/features/auth/components/FormSubmitButton";
import GithubOAuth from "@/features/auth/components/GithubOAuth";
import GoogleOAuth from "@/features/auth/components/GoogleOAuth";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import useRegister from "@/features/auth/hooks/useRegister";
import {
  TRegisterFormData,
  TRegisterFormStep1Schema,
} from "@/features/auth/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RegisterStep1() {
  const { handleStep1, isLoaded } = useRegister();
  const multiStepForm = useMultiStepFormContext<TRegisterFormData>();

  const form = useForm<z.infer<typeof TRegisterFormStep1Schema>>({
    resolver: zodResolver(TRegisterFormStep1Schema),
    defaultValues: {
      email: multiStepForm.getMultiFormData().email,
    },
  });

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Create Your Accoutn</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Register with social providers or email and password
        </FormHeader.SubHeader>
      </FormHeader>
      <div className="space-y-2">
        <GithubOAuth />
        <GoogleOAuth />
      </div>
      <FormSeparater />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleStep1)} className="space-y-4">
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

          <FormSubmitButton
            disabled={isLoaded}
            isloading={form.formState.isSubmitting}
          >
            Continue
          </FormSubmitButton>
          <div className="mt-4 text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
