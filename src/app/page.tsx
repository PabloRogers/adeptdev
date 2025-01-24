import SignOutButton from "@/features/auth/components/SignOutButton";
import createClient from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return (
    <div>
      <h1>Hello, {user.data.user?.email}</h1>

      <SignOutButton />
    </div>
  );
}
