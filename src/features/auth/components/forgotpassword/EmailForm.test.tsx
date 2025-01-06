import EmailForm from "@/features/auth/components/forgotpassword/ForgotPasswordForm";
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import { render, screen, userEvent } from "@/utils/test";

jest.mock("@/features/auth/hooks/useForgotPassword");
const mockUseForgotPassword = jest.mocked(useForgotPassword);
const handleResetPassword = jest.fn();
const handleUpdatePassword = jest.fn();
mockUseForgotPassword.mockReturnValue({
  handleResetPassword,
  isResetLoading: false,
  handleUpdatePassword,
  isUpdateLoading: false,
});

describe("ForgotPasswordForm", () => {
  describe("Rendering", () => {
    it("should render the component", () => {
      render(<EmailForm />);
      const component = screen.getByTestId("ForgotPasswordForm");
      expect(component).toBeInTheDocument();
    });

    it("should render header", () => {
      render(<EmailForm />);
      const header = screen.getByRole("heading", { name: /forgot password/i });
      expect(header).toBeInTheDocument();
    });

    it("should render sub header", () => {
      render(<EmailForm />);
      const subHeader = screen.getByText(
        /please provide the email address associated with your account\./i,
      );
      expect(subHeader).toBeInTheDocument();
    });

    it("should render email input", () => {
      render(<EmailForm />);
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      expect(emailInput).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<EmailForm />);
      const submitButton = screen.getByRole("button", { name: /continue/i });
      expect(submitButton).toBeInTheDocument();
    });

    it("should render login link", () => {
      render(<EmailForm />);
      const loginLink = screen.getByRole("link", { name: /login/i });
      expect(loginLink).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should call handleResetPassword on submit", async () => {
      const user = userEvent.setup();
      render(<EmailForm />);

      // Required for form validation
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", { name: /continue/i });
      await user.click(submitButton);

      expect(handleResetPassword).toHaveBeenCalled();
    });
  });
});
