"use client";

import { Button } from "@/components/ui/button";
import useOAuth from "@/features/auth/hooks/useOAuth";
import OAuthProvidersSchema from "@/features/auth/types/OAuth";
import { Loader2 } from "lucide-react";
import z from "zod";

interface OAuthProps {
  provider: z.infer<typeof OAuthProvidersSchema>;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export default function OAuth({ provider, Icon, text }: OAuthProps) {
  const { handleOAuthSignIn, isExecuting } = useOAuth(provider);

  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isExecuting}
      onClick={() => handleOAuthSignIn()}
    >
      {isExecuting ? (
        <Loader2 data-testid="loader" className="animate-spin" />
      ) : (
        <Icon data-testid="github" className="mr-2 h-5 w-5" />
      )}
      {text}
    </Button>
  );
}
