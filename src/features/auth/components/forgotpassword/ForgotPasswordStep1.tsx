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
import FormSubmitButton from "@/features/auth/components/FormSubmitButton";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  TForgotPasswordFormData,
  TForgotPasswordFormStep1Schema,
} from "@/features/auth/types/forgotpassword";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ForgotPasswordStep1() {
  const { isLoaded, signIn } = useSignIn();

  const multiStepForm = useMultiStepFormContext<TForgotPasswordFormData>();

  const form = useForm<z.infer<typeof TForgotPasswordFormStep1Schema>>({
    resolver: zodResolver(TForgotPasswordFormStep1Schema),
    defaultValues: {
      email: multiStepForm.getMultiFormData().email,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof TForgotPasswordFormStep1Schema>,
  ) => {
    multiStepForm.setMultiFormData({ email: data.email });

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: form.getValues("email"),
      })
      .then(() => {
        toast.info("Check your email for the reset code.");
        multiStepForm.nextStep();
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          switch (err.errors[0].code) {
            default:
              toast.error(err.errors[0].code);
              break;
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Forgot Password</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter your email to reset your password
        </FormHeader.SubHeader>
      </FormHeader>
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
