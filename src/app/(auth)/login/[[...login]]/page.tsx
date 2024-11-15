import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import FormWrapper from "@/features/auth/components/FormWrapper";
import LoginForm from "@/features/auth/components/login/LoginForm";

export default function page() {
  return (
    <FormContentWrapper>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </FormContentWrapper>
  );
}
