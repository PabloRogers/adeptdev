import MultiStepFormContext from "@/context/useMultiStepForm";
import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockContextValue = {
  currentStepIndex: 1,
  steps: [
    <div key="step1">Step 1</div>,
    <div key="step2">Step 2</div>,
    <div key="step3">Step 3</div>,
  ],
  step: <div>Step 2</div>,
  formData: { email: "test@example.com" },
  isFirstStep: false,
  isLastStep: false,
  length: 3,
  goTo: vi.fn(),
  nextStep: vi.fn(),
  backStep: vi.fn(),
  setSteps: vi.fn(),
  setData: vi.fn(),
  getData: vi.fn(() => ({ email: "test@example.com" })),
};

describe("MultiStepFormWrapper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("Rendering", () => {
    it("should render children", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const element = screen.getByText("children");
      expect(element).toBeInTheDocument();
    });
    it("should render back button when not first step", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: "Back" });
      expect(button).toBeInTheDocument();
    });
    it("should not render back button when first step", () => {
      render(
        <MultiStepFormContext.Provider
          value={{ ...mockContextValue, isFirstStep: true }}
        >
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const button = screen.queryByRole("button", { name: "Back" });
      expect(button).not.toBeInTheDocument();
    });
    it("should render current number of step indicators", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const indicators = screen.getAllByTestId("step-indicator");
      expect(indicators).toHaveLength(3);
    });
    it("should render current step indicator as active", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const indicators = screen.getAllByTestId("step-indicator");
      expect(indicators[0]).toHaveClass("bg-primary");
      expect(indicators[1]).toHaveClass("bg-primary");
      expect(indicators[2]).toHaveClass("bg-muted-foreground");
    });
  });
  describe("Behavior", () => {
    it("should call backStep on back button click", async () => {
      const user = userEvent.setup();
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: "Back" });
      await user.click(button);
      expect(mockContextValue.backStep).toHaveBeenCalledOnce();
    });
  });
});
