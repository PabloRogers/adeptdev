"use client";

import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { OAuthProviders } from "@/features/auth/types/OAuthProviders";
import { Loader2 } from "lucide-react";

interface OAuthProps {
  provider: OAuthProviders;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export default function OAuth({ provider, Icon, text }: OAuthProps) {
  const { isLoading, handleSignInWithOAuthProvider } = useOAuth(provider);

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
        <Icon data-testid="github" className="mr-2 h-5 w-5" />
      )}
      {text}
    </Button>
  );
}
