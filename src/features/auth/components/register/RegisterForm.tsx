"use client";

import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import RegisterFormStep1 from "@/features/auth/components/register/RegisterFormStep1";
import RegisterFormStep2 from "@/features/auth/components/register/RegisterFormStep2";
import RegisterFormStep3 from "@/features/auth/components/register/RegisterFormStep3";
import { MultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import useMultiStepForm from "@/features/auth/hooks/useMultiStepForm";
import { TRegisterFormData } from "@/features/auth/types";
import { useEffect } from "react";

export default function RegisterForm() {
  const initialFormData: TRegisterFormData = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    verificationPin: "",
  };

  const multiStepForm = useMultiStepForm<TRegisterFormData>(initialFormData);

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
