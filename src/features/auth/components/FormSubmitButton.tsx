import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LogIn } from "react-feather";

interface IFormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isloading?: boolean;
  children: React.ReactNode;
}

export default function FormSubmitButton({
  isloading = false,
  children,
}: IFormSubmitButtonProps) {
  return (
    <Button className="w-full" type="submit" disabled={isloading}>
      {isloading && <Loader2 className="animate-spin" />}
      {!isloading && <LogIn />}
      {children}
    </Button>
  );
}
