import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleOAuth() {
  const { signIn, signUp, isLoading, handleSignIn } = useOAuth("oauth_google");

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isLoading || !signIn || !signUp}
      onClick={() => {
        handleSignIn();
      }}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {!isLoading && <FcGoogle className="mr-2 h-5 w-5" />}
      Sign in with Google
    </Button>
  );
}
