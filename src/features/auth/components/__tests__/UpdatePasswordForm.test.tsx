import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockHandleUpdatePassword = vi.fn();
vi.mock("@/features/auth/hooks/useUpdatePassword", () => ({
  default: vi.fn(() => ({
    handleUpdatePassword: mockHandleUpdatePassword,
    isExecuting: false,
  })),
}));

describe("UpdatePasswordForm", () => {
  describe("Rendering", () => {
    it("should render new password input", () => {
      render(<UpdatePasswordForm />);
      const input = screen.getByLabelText(/new password/i);
      expect(input).toBeInTheDocument();
    });
    it("should render confirm password input", () => {
      render(<UpdatePasswordForm />);
      const input = screen.getByLabelText(/confirm password/i);
      expect(input).toBeInTheDocument();
    });
    it("should render submit button", () => {
      render(<UpdatePasswordForm />);
      const button = screen.getByRole("button", { name: /continue/i });
      expect(button).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should not call update password function on submit if form is invalid", async () => {
      const user = userEvent.setup();
      render(<UpdatePasswordForm />);
      const button = screen.getByRole("button", { name: /continue/i });

      await user.click(button);

      expect(mockHandleUpdatePassword).not.toHaveBeenCalled();
    });
    it("should call update password function on submit if form is valid", async () => {
      const user = userEvent.setup();
      render(<UpdatePasswordForm />);
      const button = screen.getByRole("button", { name: /continue/i });
      const newPassword = screen.getByLabelText(/new password/i);
      const confirmPassword = screen.getByLabelText(/confirm password/i);

      await user.type(newPassword, "password");
      await user.type(confirmPassword, "password");
      await user.click(button);

      expect(mockHandleUpdatePassword).toHaveBeenCalledOnce();
    });
  });
});
