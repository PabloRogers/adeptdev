import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function GoogleOAuth() {
  return (
    <Button variant="outline" className="w-full">
      <FcGoogle className="mr-2 h-5 w-5" /> Sign in with GitHub
    </Button>
  );
}
