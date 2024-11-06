import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export default function GithubOAuth() {
  return (
    <Button variant="outline" className="w-full">
      <FaGithub className="mr-2 h-5 w-5" /> Sign in with GitHub
    </Button>
  );
}
