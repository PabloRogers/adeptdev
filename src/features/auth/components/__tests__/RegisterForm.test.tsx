import RegisterForm from "@/features/auth/components/RegisterForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/components/RegisterFormStep1", () => ({
  default: () => <div data-testid="RegisterFormStep1">Step 1</div>,
}));

vi.mock("@/features/auth/components/RegisterFormStep2", () => ({
  default: () => <div data-testid="RegisterFormStep2">Step 2</div>,
}));

// Mock the useMultiStepForm hook
vi.mock("@/hooks/useMultiStepForm", () => {
  return {
    default: vi.fn(() => ({
      currentStepIndex: 0,
      steps: [
        <div key="RegisterFormStep1">Step 1</div>,
        <div key="RegisterFormStep2">Step 2</div>,
        <div key="RegisterFormStep3">Step 3</div>,
      ],
      step: <div data-testid="RegisterFormStep1">Step 1</div>,
      formData: { email: "test@example.com" },
      isFirstStep: true,
      isLastStep: false,
      length: 3,
      goTo: vi.fn(),
      nextStep: vi.fn(),
      backStep: vi.fn(),
      setSteps: vi.fn(),
      setData: vi.fn(),
      getData: vi.fn(() => ({ email: "test@example.com" })),
    })),
  };
});

describe("RegisterForm", () => {
  it("renders the RegisterForm component", () => {
    render(<RegisterForm />);

    // Check if the RegisterFormStep1 is rendered
    const step1 = screen.getByTestId("RegisterFormStep1");
    expect(step1).toBeInTheDocument();
  });
  it("should not render steps that are not the current step", () => {
    render(<RegisterForm />);

    const step2 = screen.queryByTestId("RegisterFormStep2");
    const step3 = screen.queryByTestId("RegisterFormStep3");

    expect(step2).not.toBeInTheDocument();
    expect(step3).not.toBeInTheDocument();
  });
});
