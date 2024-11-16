"use client";

import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import RegisterFormStep1 from "@/features/auth/components/register/RegisterFormStep1";
import RegisterFormStep2 from "@/features/auth/components/register/RegisterFormStep2";
import RegisterFormStep3 from "@/features/auth/components/register/RegisterFormStep3";
import { MultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import { RegisterFormDataSchema } from "@/features/auth/types/register";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { useEffect } from "react";

export default function RegisterForm() {
  const initialFormData: RegisterFormDataSchema = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    verificationPin: "",
  };

  const multiStepForm =
    useMultiStepForm<RegisterFormDataSchema>(initialFormData);

  // make a state in useMutliStepForm to store the steps
  useEffect(() => {
    const steps = [
      <RegisterFormStep1 key="step1" />,
      <RegisterFormStep2 key="step2" />,
      <RegisterFormStep3 key="step3" />,
    ];
    multiStepForm.setSteps(steps);
  }, []);

  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      <MultiStepFormWrapper>{multiStepForm.step}</MultiStepFormWrapper>
    </MultiStepFormContext.Provider>
  );
}
