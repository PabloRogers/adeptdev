import GoogleOAuth from "@/features/auth/components/GoogleOAuth";
import useOAuth from "@/features/auth/hooks/useOAuth";
import { render, screen, userEvent } from "@/utils/test";

jest.mock("@/features/auth/hooks/useOAuth");
const mockUseOAuth = jest.mocked(useOAuth);
const mockedHandleSignIn = jest.fn();

describe("GoogleOAuth", () => {
  describe("Rendering", () => {
    it("should render button", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GoogleOAuth />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should render text", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GoogleOAuth />);
      const text = screen.getByText("Sign in with Google");
      expect(text).toBeInTheDocument();
    });

    it("should render google icon when isLoading is false", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GoogleOAuth />);
      const icon = screen.getByTestId("google");
      expect(icon).toBeInTheDocument();
    });

    it("should not render loader when isLoading is false", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GoogleOAuth />);
      const loader = screen.queryByTestId("loader");
      expect(loader).not.toBeInTheDocument();
    });

    it("should be enabled if isLoading is false", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: false,
      });
      render(<GoogleOAuth />);
      const button = screen.getByRole("button");
      expect(button).toBeEnabled();
    });

    it("should disable button when isLoading is true", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: true,
      });
      render(<GoogleOAuth />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should render loader when isLoading is true", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: true,
      });
      render(<GoogleOAuth />);
      const loader = screen.getByTestId("loader");
      expect(loader).toBeInTheDocument();
    });

    it("should not render google icon when isLoading is true", () => {
      mockUseOAuth.mockReturnValue({
        handleSignInWithOAuthProvider: mockedHandleSignIn,
        isLoading: true,
      });
      render(<GoogleOAuth />);
      const icon = screen.queryByTestId("google");
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
      render(<GoogleOAuth />);

      const button = screen.getByRole("button");
      await user.click(button);
      expect(mockedHandleSignIn).toHaveBeenCalledTimes(1);
    });
  });
});
