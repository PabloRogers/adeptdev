"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormSeparater from "@/features/auth/components/FormSeparater";
import GithubOAuth from "@/features/auth/components/GithubOAuth";
import GoogleOAuth from "@/features/auth/components/GoogleOAuth";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogIn } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { TRegisterFormStep1Schema } from "../../types";

export default function RegisterStep1() {
  const multiStepForm = useMultiStepFormContext();
  const { isLoaded, signUp } = useSignUp();

  const form = useForm<z.infer<typeof TRegisterFormStep1Schema>>({
    resolver: zodResolver(TRegisterFormStep1Schema),
    defaultValues: {
      email: multiStepForm.getMultiFormData().email,
    },
  });

  const onSubmit = async (data: z.infer<typeof TRegisterFormStep1Schema>) => {
    multiStepForm.setMultiFormData({ email: form.getValues("email") });

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
      });
      multiStepForm.nextStep();
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        switch (err.errors[0].code) {
          default:
            toast.error(err.errors[0].longMessage);
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <p className="text-balance text-muted-foreground">
          Register with social providers or email and password
        </p>
      </div>
      <div className="space-y-2">
        <GithubOAuth />
        <GoogleOAuth />
      </div>
      <FormSeparater />
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

          <Button className="w-full" type="submit">
            <LogIn />
            Continue
          </Button>
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
