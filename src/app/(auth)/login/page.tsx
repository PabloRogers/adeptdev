import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import LoginForm from "@/features/auth/components/login/LoginForm";

export default async function page() {
  return (
    <FormContentWrapper>
      <LoginForm />
    </FormContentWrapper>
  );
}
