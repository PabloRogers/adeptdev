import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockHandleForgotPassword = vi.fn();
vi.mock("@/features/auth/hooks/useForgotPassword", () => ({
  default: vi.fn(() => ({
    handleForgotPassword: mockHandleForgotPassword,
    isExecuting: false,
  })),
}));

describe("ForgotPasswordForm", () => {
  describe("Rendering", () => {
    it("should render email input", () => {
      render(<ForgotPasswordForm />);
      const input = screen.getByRole("textbox", { name: /email/i });
      expect(input).toBeInTheDocument();
    });
    it("should render submit button", () => {
      render(<ForgotPasswordForm />);
      const button = screen.getByRole("button", { name: /continue/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should not call forgot password function on submit if form is invalid", async () => {
      const user = userEvent.setup();
      render(<ForgotPasswordForm />);
      const button = screen.getByRole("button", { name: /continue/i });

      await user.click(button);
      expect(mockHandleForgotPassword).not.toHaveBeenCalled();
    });
    it("should call forgot password function on submit if form is valid", async () => {
      const user = userEvent.setup();
      render(<ForgotPasswordForm />);
      const button = screen.getByRole("button", { name: /continue/i });
      const email = screen.getByRole("textbox", { name: /email/i });

      await user.type(email, "test@test.com");
      await user.click(button);

      expect(mockHandleForgotPassword).toHaveBeenCalledOnce();
    });
  });
});
