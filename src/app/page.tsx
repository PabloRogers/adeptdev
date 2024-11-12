import SignOutButton from "@/features/auth/components/SignOutButton";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <h1>
        Hello, {user?.firstName} {user?.lastName}
      </h1>

      <SignOutButton />
    </div>
  );
}
