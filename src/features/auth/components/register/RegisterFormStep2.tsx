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
import useRegister from "@/features/auth/hooks/useRegister";
import {
  RegisterFormDataSchema,
  RegisterFormStep2Schema,
} from "@/features/auth/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RegisterStep2() {
  const { handleStep2, isLoaded } = useRegister();
  const multiStepForm = useMultiStepFormContext<RegisterFormDataSchema>();

  const form = useForm<z.infer<typeof RegisterFormStep2Schema>>({
    resolver: zodResolver(RegisterFormStep2Schema),
    defaultValues: {
      firstName: multiStepForm.getMultiFormData().firstName,
      lastName: multiStepForm.getMultiFormData().lastName,
      password: multiStepForm.getMultiFormData().password,
      confirmPassword: multiStepForm.getMultiFormData().confirmPassword,
    },
  });

  return (
    <>
      <FormHeader>
        <FormHeader.MainHeader>Register</FormHeader.MainHeader>
        <FormHeader.SubHeader>
          Enter your name and password to register.
        </FormHeader.SubHeader>
      </FormHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleStep2)} className="space-y-4">
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
