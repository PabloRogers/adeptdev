import MultiStepFormContext from "@/context/useMultiStepForm";
import RegisterFormStep2 from "@/features/auth/components/RegisterFormStep2";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockHandleUseRegister = vi.fn();
vi.mock("@/features/auth/hooks/useRegister", () => ({
  default: vi.fn(() => ({
    handleRegister: mockHandleUseRegister,
    isExecuting: false,
  })),
}));

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

describe("RegisterFormStep2", () => {
  describe("Rendering", () => {
    it("should render first name input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const input = screen.getByRole("textbox", { name: /first name/i });
      expect(input).toBeInTheDocument();
    });
    it("should render last name input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const input = screen.getByRole("textbox", { name: /last name/i });
      expect(input).toBeInTheDocument();
    });
    it("should render password input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const input = screen.getByLabelText(/enter password/i);
      expect(input).toBeInTheDocument();
    });
    it("should render confirm password input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const input = screen.getByLabelText(/confirm password/i);
      expect(input).toBeInTheDocument();
    });
    it("should render submit button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: /register/i });
      expect(button).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should not call submit function on submit if form is invalid", async () => {
      const user = userEvent.setup();
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: /register/i });

      await user.click(button);

      expect(mockHandleUseRegister).not.toHaveBeenCalled();
    });
    it("should call submit function on submit if form is valid", async () => {
      const user = userEvent.setup();
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterFormStep2 />
        </MultiStepFormContext.Provider>,
      );
      const button = screen.getByRole("button", { name: /register/i });
      const firstName = screen.getByRole("textbox", { name: /first name/i });
      const lastName = screen.getByRole("textbox", { name: /last name/i });
      const password = screen.getByLabelText(/enter password/i);
      const confirmPassword = screen.getByLabelText(/confirm password/i);

      await user.type(firstName, "John");
      await user.type(lastName, "Doe");
      await user.type(password, "password");
      await user.type(confirmPassword, "password");
      await user.click(button);

      expect(mockHandleUseRegister).toHaveBeenCalledOnce();
    });
  });
});
