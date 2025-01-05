import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import URLErrorToast from "@/features/auth/components/URLErrorToast";
import LoginForm from "@/features/auth/components/login/LoginForm";

export default function page({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorCode = searchParams.error || null;
  return (
    <>
      <URLErrorToast error={errorCode} />
      <FormContentWrapper>
        <LoginForm />
      </FormContentWrapper>
    </>
  );
}
