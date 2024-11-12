"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return <Button onClick={() => signOut()}>Sign Out</Button>;
}
