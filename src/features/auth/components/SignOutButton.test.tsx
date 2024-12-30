import SignOutButton from "@/features/auth/components/SignOutButton";
import useSignOut from "@/features/auth/hooks/useSignOut";
import { render, screen, userEvent } from "@/utils/test";

jest.mock("@/features/auth/hooks/useSignOut.tsx");
const mockedUseSignOut = jest.mocked(useSignOut);
const signOut = jest.fn();

describe("SignOutButton", () => {
  describe("Rendering", () => {
    it("should render a button", () => {
      mockedUseSignOut.mockReturnValue({
        signOut,
      });
      render(<SignOutButton />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });
  describe("Behaviour", () => {
    it("should call signOut on click", async () => {
      const user = userEvent.setup();
      mockedUseSignOut.mockReturnValue({
        signOut,
      });
      render(<SignOutButton />);
      const button = screen.getByRole("button");

      await user.click(button);

      expect(signOut).toHaveBeenCalled();
    });
  });
});
