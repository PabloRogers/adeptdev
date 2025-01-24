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
import useRegister from "@/features/auth/hooks/useRegister";
import {
  RegisterFormStep2Schema,
  RegisterMultiStepFormSchema,
} from "@/features/auth/types/register";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "react-feather";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RegisterFormStep2() {
  const { handleRegister, isExecuting } = useRegister();

  const multiStepForm =
    useMultiStepFormContext<z.infer<typeof RegisterMultiStepFormSchema>>();

  const form = useForm<z.infer<typeof RegisterFormStep2Schema>>({
    resolver: zodResolver(RegisterFormStep2Schema),
    defaultValues: {
      firstName: multiStepForm.getData().firstName,
      lastName: multiStepForm.getData().lastName,
      password: multiStepForm.getData().password,
      confirmPassword: multiStepForm.getData().confirmPassword,
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterFormStep2Schema>) {
    multiStepForm.setData(data);
    await handleRegister({
      email: multiStepForm.getData().email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    });
  }

  return (
    <AuthForm data-testid="RegisterFormStep2">
      <AuthForm.HeaderWrapper>
        <AuthForm.MainHeader>Register</AuthForm.MainHeader>
        <AuthForm.SubHeader>
          Enter your name and password to register.
        </AuthForm.SubHeader>
      </AuthForm.HeaderWrapper>
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
                <FormLabel>Enter Password</FormLabel>

                <FormControl>
                  <TogglePasswordInput
                    placeholder="Enter your password."
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
                  <TogglePasswordInput
                    placeholder="Confirm your password."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <IconLoadingButton
            text="Register"
            Icon={LogIn}
            isExecuting={isExecuting}
            className="w-full"
          />
        </form>
      </Form>
    </AuthForm>
  );
}
