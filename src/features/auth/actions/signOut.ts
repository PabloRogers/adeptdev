"use server";

import { unauthenticatedAction } from "@/lib/safe-action";
import createClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signOutAction = unauthenticatedAction.action(async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  } else {
    redirect("/login");
  }
});

export default signOutAction;
