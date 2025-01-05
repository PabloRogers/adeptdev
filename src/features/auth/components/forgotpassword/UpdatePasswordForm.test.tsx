import UpdatePasswordForm from "@/features/auth/components/forgotpassword/UpdatePasswordForm";
import useForgotPassword from "@/features/auth/hooks/useForgotPassword";
import { render, screen, userEvent } from "@/utils/test";

jest.mock("@/features/auth/hooks/useForgotPassword");
const mockUseForgotPassword = jest.mocked(useForgotPassword);
const handleResetPassword = jest.fn();
const handleUpdatePassword = jest.fn();

describe("UpdatePasswordForm", () => {
  mockUseForgotPassword.mockReturnValue({
    handleResetPassword,
    isResetLoading: false,
    handleUpdatePassword,
    isUpdateLoading: false,
  });
  describe("Rendering", () => {
    it("should render the component", () => {
      render(<UpdatePasswordForm />);
      const component = screen.getByTestId("UpdatePasswordForm");
      expect(component).toBeInTheDocument();
    });

    it("should render header", () => {
      render(<UpdatePasswordForm />);
      const header = screen.getByRole("heading", { name: /update password/i });
      expect(header).toBeInTheDocument();
    });

    it("should render sub header", () => {
      render(<UpdatePasswordForm />);
      const subHeader = screen.getByText(
        /enter your new password to reset your password\./i,
      );
      expect(subHeader).toBeInTheDocument();
    });

    it("should render password input", () => {
      render(<UpdatePasswordForm />);
      const passwordInput = screen.getByLabelText(/new password/i);
      expect(passwordInput).toBeInTheDocument();
    });

    it("should render confirm password input", () => {
      render(<UpdatePasswordForm />);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      expect(confirmPasswordInput).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<UpdatePasswordForm />);
      const submitButton = screen.getByRole("button", {
        name: /reset password/i,
      });
      expect(submitButton).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should call handleUpdatePassword on submit", async () => {
      const user = userEvent.setup();
      render(<UpdatePasswordForm />);

      // Required for form validation
      const passwordInput = screen.getByLabelText(/new password/i);
      await user.type(passwordInput, "password123");

      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      await user.type(confirmPasswordInput, "password123");

      const submitButton = screen.getByRole("button", {
        name: /reset password/i,
      });
      await userEvent.click(submitButton);

      expect(handleUpdatePassword).toHaveBeenCalled();
    });
  });
});
