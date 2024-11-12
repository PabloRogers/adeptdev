"use client";

import { Button } from "@/components/ui/button";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function GithubOAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const signInWith = () => {
    return signIn?.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  async function handleSignIn() {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === "transferable" &&
      signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === "complete") {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      signInWith();
    }
    return null;
  }

  if (!signIn || !signUp) {
    return (
      <Button variant="outline" className="w-full" disabled>
        <FaGithub className="mr-2 h-5 w-5" /> Sign in with GitHub
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await handleSignIn();
      }}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {!isLoading && <FaGithub className="mr-2 h-5 w-5" />}
      Sign in with GitHub
    </Button>
  );
}
