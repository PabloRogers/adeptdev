import MultiStepFormContext from "@/context/useMultiStepForm";
import MultiStepFormWrapper from "@/features/auth/components/MultiStepFormWrapper";
import { render, screen } from "@/utils/test";

let mockContextValue = {
  currentStepIndex: 0,
  steps: [<div>Mock Step</div>],
  step: <div>Mock Step</div>,
  formData: {},
  isFirstStep: true,
  isLastStep: false,
  length: 1,
  goTo: jest.fn(),
  nextStep: jest.fn(),
  backStep: jest.fn(),
  setSteps: jest.fn(),
  setData: jest.fn(),
  getData: jest.fn(),
};

describe("MultiStepFormWrapper", () => {
  beforeEach(() => {
    mockContextValue = {
      currentStepIndex: 0,
      steps: [<div>Mock Step</div>],
      step: <div>Mock Step</div>,
      formData: {},
      isFirstStep: true,
      isLastStep: false,
      length: 1,
      goTo: jest.fn(),
      nextStep: jest.fn(),
      backStep: jest.fn(),
      setSteps: jest.fn(),
      setData: jest.fn(),
      getData: jest.fn(),
    };
  });
  describe("Rendering", () => {
    it("should render the component", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const component = screen.getByTestId("MultiStepFormWrapper");
      expect(component).toBeInTheDocument();
    });

    it("should render the children", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const children = screen.getByText("children");
      expect(children).toBeInTheDocument();
    });

    it("should not render the back button on first step", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const backButton = screen.queryByRole("button", { name: /back/i });
      expect(backButton).not.toBeInTheDocument();
    });

    it("should render the back button if not first step", () => {
      mockContextValue.isFirstStep = false;
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const backButton = screen.getByRole("button", { name: /back/i });
      expect(backButton).toBeInTheDocument();
    });

    it("should render the correct number of dots", () => {
      mockContextValue.length = 3;
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const dots = screen.getAllByTestId("step-indicator");
      expect(dots).toHaveLength(3);
    });

    it("should highlight the correct dots", () => {
      mockContextValue.currentStepIndex = 1;
      mockContextValue.length = 3;
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <MultiStepFormWrapper>children</MultiStepFormWrapper>
        </MultiStepFormContext.Provider>,
      );
      const dots = screen.getAllByTestId("step-indicator");
      expect(dots[0]).toHaveClass("bg-primary");
      expect(dots[1]).toHaveClass("bg-primary");
      expect(dots[2]).toHaveClass("bg-muted-foreground");
    });
  });
});
