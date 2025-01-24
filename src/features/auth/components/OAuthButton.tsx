"use client";

import IconLoadingButton from "@/components/IconLoadingButton";
import useOAuth from "@/features/auth/hooks/useOAuth";
import OAuthProvidersSchema from "@/features/auth/types/OAuth";
import z from "zod";

interface OAuthProps {
  provider: z.infer<typeof OAuthProvidersSchema>;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export default function OAuthButton({ provider, Icon, text }: OAuthProps) {
  const { handleOAuthSignIn, isExecuting } = useOAuth(provider);

  return (
    <IconLoadingButton
      isExecuting={isExecuting}
      onClick={handleOAuthSignIn}
      Icon={Icon}
      text={text}
      variant="outline"
      className="w-full"
    />
  );
}
