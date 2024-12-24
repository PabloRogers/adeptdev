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
import { useMultiStepFormContext } from "@/context/useMultiStepForm";
import { AuthForm } from "@/features/auth/components/AuthForm";
import useRegister from "@/features/auth/hooks/useRegister";
import {
  RegisterFormDataSchema,
  RegisterFormStep2Schema,
} from "@/features/auth/types/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RegisterStep2() {
  const { handleSignUp, isLoading } = useRegister();
  const router = useRouter();
  const multiStepForm = useMultiStepFormContext<RegisterFormDataSchema>();

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
    await handleSignUp(multiStepForm.formData.email, data.password);
    router.push("/register");
  }

  return (
    <AuthForm>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <AuthForm.PasswordInput placeholder="Password" {...field} />
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
                  <AuthForm.PasswordInput
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthForm.SubmitButton isloading={isLoading}>
            Continue
          </AuthForm.SubmitButton>
        </form>
      </Form>
    </AuthForm>
  );
}
