"use client";

import MultiStepFormContext from "@/context/useMultiStepForm";
import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import RegisterFormStep1 from "@/features/auth/components/register/RegisterFormStep1";
import RegisterFormStep2 from "@/features/auth/components/register/RegisterFormStep2";
import { RegisterFormDataSchema } from "@/features/auth/types/register";
import useMultiStepForm from "@/hooks/useMultiStepForm";

export default function RegisterForm() {
  const initialFormData: RegisterFormDataSchema = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    verificationPin: "",
  };

  const steps = [
    <RegisterFormStep1 key="step1" />,
    <RegisterFormStep2 key="step2" />,
  ];

  const multiStepForm = useMultiStepForm<RegisterFormDataSchema>(
    initialFormData,
    steps,
  );

  return (
    <div data-testid="RegisterForm">
      <MultiStepFormContext.Provider value={multiStepForm}>
        <MultiStepFormWrapper>{multiStepForm.step}</MultiStepFormWrapper>
      </MultiStepFormContext.Provider>
    </div>
  );
}
