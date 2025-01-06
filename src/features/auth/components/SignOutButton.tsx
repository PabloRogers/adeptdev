"use client";

import { Button } from "@/components/ui/button";
import useSignOut from "@/features/auth/hooks/useSignOut";
import { Loader2 } from "lucide-react";
import { LogOut } from "react-feather";

export default function SignOutButton() {
  const { handleSignOut, isExecuting } = useSignOut();

  return (
    <Button
      type="submit"
      disabled={isExecuting}
      onClick={() => handleSignOut()}
    >
      {isExecuting ? (
        <Loader2 data-testid="loader" className="animate-spin" />
      ) : (
        <LogOut data-testid="logout" />
      )}
      Sign Out
    </Button>
  );
}
