import IconLoadingButton from "@/components/IconLoadingButton";
import { render, screen } from "@testing-library/react";
import { FaGoogle } from "react-icons/fa";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockOnClick = vi.fn();

const mockProps = {
  Icon: FaGoogle,
  handleOnClick: mockOnClick,
  text: "text",
  isExecuting: false,
};

describe("IconLoadingButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("Rendering", () => {
    it("should render text props", () => {
      render(<IconLoadingButton {...mockProps} />);
      const button = screen.getByRole("button", { name: "text" });
      expect(button).toBeInTheDocument();
    });

    it("should render Icon when not executing", () => {
      render(<IconLoadingButton {...mockProps} />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("should not render Icon when executing", () => {
      render(<IconLoadingButton {...mockProps} isExecuting />);
      const icon = screen.queryByTestId("icon");
      expect(icon).not.toBeInTheDocument();
    });

    it("should render Loader when executing", () => {
      render(<IconLoadingButton {...mockProps} isExecuting />);
      const loader = screen.getByTestId("loader");
      expect(loader).toBeInTheDocument();
    });

    it("should not render Loader when not executing", () => {
      render(<IconLoadingButton {...mockProps} />);
      const loader = screen.queryByTestId("loader");
      expect(loader).not.toBeInTheDocument();
    });

    it("should disable button when executing", () => {
      render(<IconLoadingButton {...mockProps} isExecuting />);
      const button = screen.getByRole("button", { name: "text" });
      expect(button).toBeDisabled();
    });

    it("should not disable button when not executing", () => {
      render(<IconLoadingButton {...mockProps} />);
      const button = screen.getByRole("button", { name: "text" });
      expect(button).toBeEnabled();
    });
  });
});
