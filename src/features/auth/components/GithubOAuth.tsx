"use client";

import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function GithubOAuth() {
  const { isLoading, handleSignInWithOAuthProvider } = useOAuth("github");

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={() => handleSignInWithOAuthProvider()}
    >
      {isLoading && <Loader2 data-testid="loader" className="animate-spin" />}
      {!isLoading && <FaGithub data-testid="github" className="mr-2 h-5 w-5" />}
      Sign in with GitHub
    </Button>
  );
}
