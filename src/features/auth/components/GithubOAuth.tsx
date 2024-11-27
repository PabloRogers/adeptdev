"use client";

import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function GithubOAuth() {
  const { signIn, signUp, isLoading, handleSignIn } = useOAuth("oauth_github");

  return (
    <Button
      data-testid="GithubOAuth-button"
      variant="outline"
      className="w-full"
      disabled={isLoading || !signIn || !signUp}
      onClick={() => {
        handleSignIn();
      }}
    >
      {isLoading && (
        <Loader2 data-testid="GithubOAuth-loader" className="animate-spin" />
      )}
      {!isLoading && (
        <FaGithub data-testid="GithubOAuth-icon" className="mr-2 h-5 w-5" />
      )}
      Sign in with GitHub
    </Button>
  );
}
