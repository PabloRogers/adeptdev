"use client";

import ForgotPasswordStep1 from "@/features/auth/components/forgotpassword/ForgotPasswordStep1";
import ForgotPasswordStep2 from "@/features/auth/components/forgotpassword/ForgotPasswordStep2";
import ForgotPasswordStep3 from "@/features/auth/components/forgotpassword/ForgotPasswordStep3";
import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import { MultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import { ForgotPasswordFormData } from "@/features/auth/types/forgotpassword";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { useEffect } from "react";

export default function ForgotPasswordFrom() {
  const initialFormData: ForgotPasswordFormData = {
    email: "",
    verificationPin: "",
    password: "",
    confirmPassword: "",
  };

  const multiStepForm =
    useMultiStepForm<ForgotPasswordFormData>(initialFormData);

  useEffect(() => {
    const steps = [
      <ForgotPasswordStep1 key="step1" />,
      <ForgotPasswordStep2 key="step2" />,
      <ForgotPasswordStep3 key="step3" />,
    ];
    multiStepForm.setSteps(steps);
  }, []);

  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      <MultiStepFormWrapper>{multiStepForm.step}</MultiStepFormWrapper>
    </MultiStepFormContext.Provider>
  );
}
