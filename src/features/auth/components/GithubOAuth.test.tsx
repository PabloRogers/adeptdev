import GithubOAuth from "@/features/auth/components/GithubOAuth";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { render, screen, userEvent } from "@/utils/test";

jest.mock("@/features/auth/hooks/useOAuth");
const mockUseOAuth = jest.mocked(useOAuth);
const mockedHandleSignIn = jest.fn();

describe("GithubOAuth", () => {
  describe("Rendering", () => {
    it("should render button", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GithubOAuth />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should render text", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GithubOAuth />);
      const text = screen.getByText("Sign in with GitHub");
      expect(text).toBeInTheDocument();
    });

    it("should render github icon when isLoading is false", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GithubOAuth />);
      const icon = screen.getByTestId("github");
      expect(icon).toBeInTheDocument();
    });

    it("should not render loader when isLoading is false", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GithubOAuth />);
      const loader = screen.queryByTestId("loader");
      expect(loader).not.toBeInTheDocument();
    });
    it("should be enabled if isLoading is false", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GithubOAuth />);
      const button = screen.getByRole("button");
      expect(button).toBeEnabled();
    });
    it("should disable button when isLoading is true", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: true,
      });
      render(<GithubOAuth />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
    it("should render loader when isLoading is true", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: true,
      });
      render(<GithubOAuth />);
      const loader = screen.getByTestId("loader");
      expect(loader).toBeInTheDocument();
    });
    it("should not render github icon when isLoading is true", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: true,
      });
      render(<GithubOAuth />);
      const icon = screen.queryByTestId("github");
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe("Behaviour", () => {
    it("should call handleSignInWithOAuthProvider on button click", async () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      const user = userEvent.setup();
      render(<GithubOAuth />);

      const button = screen.getByRole("button");
      await user.click(button);
      expect(mockedHandleSignIn).toHaveBeenCalledTimes(1);
    });
  });
});
