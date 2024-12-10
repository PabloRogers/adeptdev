"use client";

import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function useSignOut() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return { signOut };
}
