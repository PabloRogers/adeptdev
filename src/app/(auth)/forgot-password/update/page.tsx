import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import UpdatePasswordForm from "@/features/auth/components/forgotpassword/UpdatePasswordForm";

export default async function page() {
  return (
    <FormContentWrapper>
      <UpdatePasswordForm />
    </FormContentWrapper>
  );
}
