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
  TRegisterFormData,
  TRegisterFormStep2Schema,
} from "@/features/auth/types";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function RegisterStep2() {
  const multiStepForm = useMultiStepFormContext<TRegisterFormData>();
  const { isLoaded, signUp } = useSignUp();

  const form = useForm<z.infer<typeof TRegisterFormStep2Schema>>({
    resolver: zodResolver(TRegisterFormStep2Schema),
    defaultValues: {
      firstName: multiStepForm.getMultiFormData().firstName,
      lastName: multiStepForm.getMultiFormData().lastName,
      password: multiStepForm.getMultiFormData().password,
      confirmPassword: multiStepForm.getMultiFormData().confirmPassword,
    },
  });

  async function onSubmit(data: z.infer<typeof TRegisterFormStep2Schema>) {
    multiStepForm.setMultiFormData({
      firstName: form.getValues("firstName"),
      lastName: form.getValues("lastName"),
      password: form.getValues("password"),
      confirmPassword: form.getValues("confirmPassword"),
    });

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: multiStepForm.getMultiFormData().email,
        password: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.info("A verification code has been sent to your email address.");
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
  }

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Personal Information</h1>
        <p className="text-balance text-muted-foreground">
          Please enter your personal information and create a password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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
            Continue
          </FormSubmitButton>
        </form>
      </Form>
    </>
  );
}
