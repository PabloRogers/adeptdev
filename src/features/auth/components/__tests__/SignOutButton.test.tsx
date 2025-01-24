import SignOutButton from "@/features/auth/components/SignOutButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/components/IconLoadingButton");

const mockHandleSignOut = vi.fn();
const mockUseSignOut = vi.fn();
let mockIsExecuting = false;
vi.mock("@/features/auth/hooks/useSignOut", () => {
  return {
    default: (provider: string) => {
      mockUseSignOut(provider);
      return {
        handleSignOut: mockHandleSignOut,
        isExecuting: mockIsExecuting,
      };
    },
  };
});

describe("SignOutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsExecuting = false;
  });
  describe("Rendering", () => {
    it("should correctly pass isExecuting to IconLoadingButton", () => {
      mockIsExecuting = true;
      render(<SignOutButton />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });
  describe("Behavior", () => {
    it("should pass down handleSignOut correctly", async () => {
      const user = userEvent.setup();
      render(<SignOutButton />);
      const button = screen.getByRole("button");
      await user.click(button);
      expect(mockHandleSignOut).toHaveBeenCalledOnce();
    });
  });
});
