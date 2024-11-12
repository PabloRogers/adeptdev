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
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "react-feather";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function RegisterStep2() {
  const multiStepForm = useMultiStepFormContext();
  const { isLoaded, signUp } = useSignUp();

  const formSchema = z
    .object({
      firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
      }),
      lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
      }),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
      confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: multiStepForm.getMultiFormData().firstName,
      lastName: multiStepForm.getMultiFormData().lastName,
      password: multiStepForm.getMultiFormData().password,
      confirmPassword: multiStepForm.getMultiFormData().confirmPassword,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
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
          <Button className="w-full" type="submit">
            <LogIn />
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
