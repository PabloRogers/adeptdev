import LoginForm from "@/features/auth/components/login/LoginForm";
import useLogin from "@/features/auth/hooks/useLogin";
import { render, screen, userEvent } from "@/utils/test";

jest.mock("@/features/auth/hooks/useLogin");
const mockUseLogin = jest.mocked(useLogin);
const handleLogin = jest.fn();

mockUseLogin.mockReturnValue({
  handleLogin,
  login: jest.fn(),
  isLoading: false,
});

describe("LoginForm", () => {
  describe("Rendering", () => {
    it("should render the component", () => {
      render(<LoginForm />);
      const component = screen.getByTestId("LoginForm");
      expect(component).toBeInTheDocument();
    });

    it("should render header", () => {
      render(<LoginForm />);
      const header = screen.getByRole("heading", { name: /login/i });
      expect(header).toBeInTheDocument();
    });

    it("should render sub header", () => {
      render(<LoginForm />);
      const subHeader = screen.getByText(
        /login with social providers or email and password\./i,
      );
      expect(subHeader).toBeInTheDocument();
    });

    it("should render github OAuth button", () => {
      render(<LoginForm />);
      const githubButton = screen.getByRole("button", {
        name: /sign in with github/i,
      });
      expect(githubButton).toBeInTheDocument();
    });

    it("should render google OAuth button", () => {
      render(<LoginForm />);
      const googleButton = screen.getByRole("button", {
        name: /sign in with google/i,
      });
      expect(googleButton).toBeInTheDocument();
    });

    it("should render divider", () => {
      render(<LoginForm />);
      const divider = screen.getByTestId("separator");
      expect(divider).toBeInTheDocument();
    });

    it("should render email input", () => {
      render(<LoginForm />);
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      expect(emailInput).toBeInTheDocument();
    });

    it("should render password input", () => {
      render(<LoginForm />);
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toBeInTheDocument();
    });

    it("should render login button", () => {
      render(<LoginForm />);
      const loginButton = screen.getByRole("button", { name: /login/i });
      expect(loginButton).toBeInTheDocument();
    });

    it("should render forgot password link", () => {
      render(<LoginForm />);
      const forgotPasswordLink = screen.getByRole("link", {
        name: /register/i,
      });
      expect(forgotPasswordLink).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should call handleLogin on submit", async () => {
      const user = userEvent.setup();
      render(<LoginForm />);

      // Required for form validation
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      // Required for form validation
      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, "password123");

      const submitButton = screen.getByRole("button", { name: /login/i });
      await user.click(submitButton);

      expect(handleLogin).toHaveBeenCalled();
    });
  });
});
