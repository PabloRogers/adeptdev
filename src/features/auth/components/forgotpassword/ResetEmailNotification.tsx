import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail } from "react-feather";

export default function ResetEmailNotification() {
  return (
    <Alert className="text-popover-foreground">
      <Mail className="h-4 w-4" />
      <AlertTitle>Email Sent!</AlertTitle>
      <AlertDescription>
        We’ve sent a password reset link to your email. Please check your inbox
        and follow the instructions to reset your password. If you don’t see the
        email, check your spam or junk folder.
      </AlertDescription>
    </Alert>
  );
}
