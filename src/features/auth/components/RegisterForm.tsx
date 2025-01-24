"use client";

import MultiStepFormContext from "@/context/useMultiStepForm";
import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import RegisterFormStep1 from "@/features/auth/components/RegisterFormStep1";
import RegisterFormStep2 from "@/features/auth/components/RegisterFormStep2";
import { RegisterMultiStepFormSchema } from "@/features/auth/types/register";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import z from "zod";

export default function RegisterForm() {
  const initialFormData: z.infer<typeof RegisterMultiStepFormSchema> = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const steps = [
    <RegisterFormStep1 key="step1" />,
    <RegisterFormStep2 key="step2" />,
  ];

  const multiStepForm = useMultiStepForm<
    z.infer<typeof RegisterMultiStepFormSchema>
  >(initialFormData, steps);

  return (
    <div data-testid="RegisterForm">
      <MultiStepFormContext.Provider value={multiStepForm}>
        <MultiStepFormWrapper>{multiStepForm.step}</MultiStepFormWrapper>
      </MultiStepFormContext.Provider>
    </div>
  );
}
