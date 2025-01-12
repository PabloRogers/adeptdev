"use client";

import IconLoadingButton from "@/features/auth/components/IconLoadingButton";
import useSignOut from "@/features/auth/hooks/useSignOut";
import { LogOut } from "react-feather";

export default function SignOutButton() {
  const { handleSignOut, isExecuting } = useSignOut();

  return (
    <IconLoadingButton
      isExecuting={isExecuting}
      onClick={handleSignOut}
      text="Sign out"
      Icon={LogOut}
      size="sm"
    />
  );
}
