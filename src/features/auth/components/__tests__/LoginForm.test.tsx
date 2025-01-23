import LoginForm from "@/features/auth/components/LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockHandleLogin = vi.fn();
vi.mock("@/features/auth/hooks/useLogin", () => ({
  default: vi.fn(() => ({
    handleLogin: mockHandleLogin,
    isExecuting: false,
  })),
}));

describe("LoginForm", () => {
  describe("Rendering", () => {
    it("should render github OAuth button", () => {
      render(<LoginForm />);
      const button = screen.getByText(/github/i);
      expect(button).toBeInTheDocument();
    });
    it("should render google OAuth button", () => {
      render(<LoginForm />);
      const button = screen.getByText(/google/i);
      expect(button).toBeInTheDocument();
    });
    it("should render email input", () => {
      render(<LoginForm />);
      const input = screen.getByRole("textbox", { name: /email/i });
      expect(input).toBeInTheDocument();
    });
    it("should render password input", () => {
      render(<LoginForm />);
      const input = screen.getByLabelText(/password/i);
      expect(input).toBeInTheDocument();
    });
    it("should render submit button", () => {
      render(<LoginForm />);
      const button = screen.getByRole("button", { name: /login/i });
      expect(button).toBeInTheDocument();
    });
    it("should render register link", () => {
      render(<LoginForm />);
      const link = screen.getByRole("link", { name: /register/i });
      expect(link).toBeInTheDocument();
    });
    it("should render forgot password link", () => {
      render(<LoginForm />);
      const link = screen.getByRole("link", {
        name: /forgot your password\?/i,
      });
      expect(link).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should not call login function on submit if form is invalid", async () => {
      const user = userEvent.setup();
      render(<LoginForm />);
      const button = screen.getByRole("button", { name: /login/i });

      await user.click(button);

      expect(mockHandleLogin).not.toHaveBeenCalled();
    });
    it("should call login function on submit", async () => {
      const user = userEvent.setup();
      render(<LoginForm />);
      const email = screen.getByRole("textbox", { name: /email/i });
      const password = screen.getByLabelText(/password/i);
      const button = screen.getByRole("button", { name: /login/i });

      await user.type(email, "test@test.com");
      await user.type(password, "password");
      await user.click(button);

      expect(mockHandleLogin).toHaveBeenCalledOnce();
    });
  });
});
