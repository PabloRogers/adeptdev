"use client";

import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import ForgotPasswordFrom from "@/features/auth/components/forgotpassword/ForgotPasswordForm";

export default function page() {
  return (
    <FormContentWrapper>
      <ForgotPasswordFrom />
    </FormContentWrapper>
  );
}
