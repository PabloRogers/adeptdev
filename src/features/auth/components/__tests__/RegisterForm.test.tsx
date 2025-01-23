import RegisterForm from "@/features/auth/components/RegisterForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock the child components
vi.mock("@/features/auth/components/register/RegisterFormStep1", () => ({
  default: () => <div data-testid="RegisterFormStep1">Step 1</div>,
}));

vi.mock("@/features/auth/components/register/RegisterFormStep2", () => ({
  default: () => <div data-testid="RegisterFormStep2">Step 2</div>,
}));

vi.mock("@/hooks/useMultiStepForm", () => {
  return {
    default: vi.fn(() => ({
      currentStepIndex: 1,
      steps: [
        <div key="RegisterFormStep1">Step 1</div>,
        <div key="RegisterFormStep2">Step 2</div>,
        <div key="RegisterFormStep3">Step 3</div>,
      ],
      step: <div key="RegisterFormStep2">Step 2</div>,
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
    })),
  };
});

describe("RegisterForm", () => {
  it("renders the RegisterForm component", () => {
    render(<RegisterForm />);

    // Check if the wrapper div is rendered
    const registerForm = screen.getByTestId("RegisterForm");
    expect(registerForm).toBeInTheDocument();

    // Check if the first step of the form is rendered
    const step1 = screen.getByTestId("RegisterFormStep1");
    expect(step1).toBeInTheDocument();

    // Ensure the second step is not yet rendered
    const step2 = screen.getByTestId("RegisterFormStep2");
    expect(step2).not.toBeInTheDocument();
  });
});
