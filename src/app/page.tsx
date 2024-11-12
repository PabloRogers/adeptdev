import SignOutButton from "@/features/auth/components/SignOutButton";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      {user?.firstName && <h1>Hello, {user.firstName}</h1>}
      <SignOutButton />
    </div>
  );
}
