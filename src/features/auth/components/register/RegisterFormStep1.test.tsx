import MultiStepFormContext from "@/context/useMultiStepForm";
import RegisterStep1 from "@/features/auth/components/register/RegisterFormStep1";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";
import { render, screen, userEvent } from "@/utils/test";

const mockFormData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  verificationPin: "",
};

const nextStep = jest.fn();
const setData = jest.fn();

const mockContextValue = {
  currentStepIndex: 0,
  steps: [<div>Mock Step</div>],
  step: <div>Mock Step</div>,
  formData: {},
  isFirstStep: true,
  isLastStep: false,
  length: 1,
  goTo: jest.fn(),
  nextStep,
  backStep: jest.fn(),
  setSteps: jest.fn(),
  setData,
  getData: jest.fn().mockReturnValue(mockFormData),
};

jest.mock("@/hooks/useMultiStepFormContext");
const mockUseMultiStepFormContext = jest.mocked(useMultiStepFormContext);
mockUseMultiStepFormContext.mockReturnValue(mockContextValue);

describe("RegisterFormStep1", () => {
  beforeEach(() => {
    nextStep.mockClear();
    setData.mockClear();
    mockUseMultiStepFormContext.mockReturnValue(mockContextValue);
  });
  describe("Rendering", () => {
    it("should render the component", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const component = screen.getByRole("heading", {
        name: /create your account/i,
      });
      expect(component).toBeInTheDocument();
    });

    it("should render header", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const header = screen.getByRole("heading", {
        name: /create your account/i,
      });
      expect(header).toBeInTheDocument();
    });

    it("should render sub header", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const subHeader = screen.getByText(
        /register with social providers or email\./i,
      );
      expect(subHeader).toBeInTheDocument();
    });

    it("should render github OAuth button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const githubButton = screen.getByRole("button", {
        name: /sign in with github/i,
      });
      expect(githubButton).toBeInTheDocument();
    });

    it("should render google OAuth button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const googleButton = screen.getByRole("button", {
        name: /sign in with google/i,
      });
      expect(googleButton).toBeInTheDocument();
    });

    it("should render divider", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const divider = screen.getByTestId("separator");
      expect(divider).toBeInTheDocument();
    });

    it("should render email input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      expect(emailInput).toBeInTheDocument();
    });

    it("should render continue button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const continueButton = screen.getByRole("button", { name: /continue/i });
      expect(continueButton).toBeInTheDocument();
    });

    it("should render login link", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );
      const loginLink = screen.getByRole("link", { name: /login/i });
      expect(loginLink).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should call nextStep on submit", async () => {
      const user = userEvent.setup();

      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );

      // Required for form validation
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      const continueButton = screen.getByRole("button", { name: /continue/i });
      await user.click(continueButton);

      expect(nextStep).toHaveBeenCalledTimes(1);
    });

    it("should call setData on submit", async () => {
      const user = userEvent.setup();

      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep1 />
        </MultiStepFormContext.Provider>,
      );

      // Required for form validation
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "test@example.com");

      const continueButton = screen.getByRole("button", { name: /continue/i });
      await user.click(continueButton);

      expect(setData).toHaveBeenCalledTimes(1);
    });
  });
});
