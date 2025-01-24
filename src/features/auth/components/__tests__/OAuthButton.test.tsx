import OAuthButton from "@/features/auth/components/OAuthButton";
import OAuthProvidersSchema from "@/features/auth/types/OAuth";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaGoogle } from "react-icons/fa";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

vi.mock("@/features/auth/components/IconLoadingButton");

const mockOnClick = vi.fn();
const mockUseOAuth = vi.fn();

vi.mock("@/features/auth/hooks/useOAuth", () => {
  return {
    default: (provider: string) => {
      mockUseOAuth(provider);
      return {
        handleOAuthSignIn: mockOnClick,
        isExecuting: false,
      };
    },
  };
});

const mockProps = {
  Icon: FaGoogle,
  text: "text",
  provider: "github" as z.infer<typeof OAuthProvidersSchema>,
};

describe("OAuthButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("Rendering", () => {
    it("should pass down text correctly", () => {
      render(<OAuthButton {...mockProps} />);
      const button = screen.getByRole("button", { name: "text" });
      expect(button).toBeInTheDocument();
    });

    it("should pass down Icon correctly", () => {
      render(<OAuthButton {...mockProps} />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("should pass down isExecuting correctly", () => {
      render(<OAuthButton {...mockProps} />);
      const button = screen.getByRole("button", { name: "text" });
      expect(button).toBeEnabled();
    });

    it("should pass down provider to hook call", () => {
      render(<OAuthButton {...mockProps} />);
      expect(mockUseOAuth).toHaveBeenCalledWith("github");
    });
  });
  describe("Behavior", () => {
    it("should pass down handleOnClick correctly", async () => {
      const user = userEvent.setup();
      render(<OAuthButton {...mockProps} />);
      const button = screen.getByRole("button", { name: "text" });
      await user.click(button);
      expect(mockOnClick).toHaveBeenCalledOnce();
    });
  });
});
