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
import FormSubmitButton from "@/features/auth/components/FormSubmitButton";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import {
  TForgotPasswordFormData,
  TForgotPasswordFormStep3Schema,
} from "@/features/auth/types";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function ForgotPasswordStep3() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const multiStepForm = useMultiStepFormContext<TForgotPasswordFormData>();

  const form = useForm<z.infer<typeof TForgotPasswordFormStep3Schema>>({
    resolver: zodResolver(TForgotPasswordFormStep3Schema),
    defaultValues: {
      password: multiStepForm.getMultiFormData().password,
      confirmPassword: multiStepForm.getMultiFormData().confirmPassword,
    },
  });

  async function onSubmit(
    data: z.infer<typeof TForgotPasswordFormStep3Schema>,
  ) {
    multiStepForm.setMultiFormData({
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: multiStepForm.getMultiFormData().verificationPin,
        password: form.getValues("password"),
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          toast.info("Need to verify second factor");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      })
      .catch((err) => {
        if (isClerkAPIResponseError(err)) {
          switch (err.errors[0].code) {
            case "form_code_incorrect":
              multiStepForm.backStep();
              toast.error(err.errors[0].longMessage);
              break;
            default:
              toast.error(err.errors[0].longMessage);
              break;
          }
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  }

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email address to reset your password.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <FormSubmitButton
            disabled={isLoaded}
            isloading={form.formState.isSubmitting}
          >
            Reset Password
          </FormSubmitButton>
        </form>
      </Form>
    </>
  );
}
