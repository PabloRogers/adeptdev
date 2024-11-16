import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState } from "react";

type OAuthStrategy = "oauth_google" | "oauth_github";

export default function useOAuth(strategy: OAuthStrategy) {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const signInWith = () => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  async function handleSignIn() {
    setIsLoading(true);
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
  return { signIn, signUp, handleSignIn, isLoading };
}
