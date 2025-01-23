import MultiStepFormContext from "@/context/useMultiStepForm";
import RegisterFormStep1 from "@/features/auth/components/RegisterFormStep1";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockContextValue = {
  currentStepIndex: 1,
  steps: [
    <div key="step1">Step 1</div>,
    <div key="step2">Step 2</div>,
    <div key="step3">Step 3</div>,
  ],
  step: <div>Step 2</div>,
  formData: { email: "" },
  isFirstStep: false,
  isLastStep: false,
  length: 3,
  goTo: vi.fn(),
  nextStep: vi.fn(),
  backStep: vi.fn(),
  setSteps: vi.fn(),
  setData: vi.fn(),
  getData: vi.fn(() => ({ email: "" })),
};

describe("RegisterFormStep1", () => {
  describe("Rendering", () => {
    it("should render github OAuth button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep1 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", {
        name: /sign in with github/i,
      });
      expect(button).toBeInTheDocument();
    });
    it("should render google OAuth button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep1 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", {
        name: /sign in with google/i,
      });
      expect(button).toBeInTheDocument();
    });
    it("should render email input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep1 />
        </MultiStepFormContext.Provider>,
      );
      const input = screen.getByRole("textbox", { name: /email/i });
      expect(input).toBeInTheDocument();
    });
    it("should render submit button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep1 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: /continue/i });
      expect(button).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should not call submit function on submit if form is invalid", async () => {
      const user = userEvent.setup();
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep1 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: /continue/i });

      await user.click(button);

      expect(mockContextValue.nextStep).not.toHaveBeenCalled();
    });
    it("should call submit function on submit if form is valid", async () => {
      const user = userEvent.setup();
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep1 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: /continue/i });
      const email = screen.getByRole("textbox", { name: /email/i });

      await user.type(email, "test@test.com");
      await user.click(button);

      expect(mockContextValue.nextStep).toHaveBeenCalledOnce();
    });
  });
});
