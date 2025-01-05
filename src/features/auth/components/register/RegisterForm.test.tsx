import RegisterForm from "@/features/auth/components/register/RegisterForm";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { render, screen } from "@/utils/test";

jest.mock("@/hooks/useMultiStepForm");
const mockUseMultiStepForm = jest.mocked(useMultiStepForm);
mockUseMultiStepForm.mockReturnValue({
  currentStepIndex: 0,
  steps: [],
  step: <div>Step 1 Component</div>,
  formData: {},
  isFirstStep: true,
  isLastStep: false,
  length: 0,
  goTo: jest.fn(),
  nextStep: jest.fn(),
  backStep: jest.fn(),
  setSteps: jest.fn(),
  setData: jest.fn(),
  getData: jest.fn(),
});

describe("FormContentWrapper", () => {
  describe("Rendering", () => {
    it("should render component", () => {
      render(<RegisterForm />);
      const component = screen.getByTestId("RegisterForm");
      expect(component).toBeInTheDocument();
    });

    it("should render step", () => {
      render(<RegisterForm />);
      const step1 = screen.getByText("Step 1 Component");
      expect(step1).toBeInTheDocument();
    });
  });
});
