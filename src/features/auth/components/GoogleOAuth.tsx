import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleOAuth() {
  const { handleSignInWithOAuthProvider, isLoading } = useOAuth("google");

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={() => handleSignInWithOAuthProvider()}
    >
      {isLoading ? (
        <Loader2 data-testid="loader" className="animate-spin" />
      ) : (
        <FcGoogle data-testid="google" className="mr-2 h-5 w-5" />
      )}
      Sign in with Google
    </Button>
  );
}
