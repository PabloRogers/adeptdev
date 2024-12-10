"use client";

import { Button } from "@/components/ui/button";
import useSignOut from "@/features/auth/hooks/useSignOut";

export default function SignOutButton() {
  const { signOut } = useSignOut();

  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
