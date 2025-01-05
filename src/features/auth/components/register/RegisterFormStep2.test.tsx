import MultiStepFormContext from "@/context/useMultiStepForm";
import RegisterStep2 from "@/features/auth/components/register/RegisterFormStep2";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";
import { render, screen, userEvent } from "@/utils/test";
import { useRouter } from "next/navigation";

const mockFormData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  verificationPin: "",
};

const mockContextValue = {
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
  getData: jest.fn().mockReturnValue(mockFormData),
};

jest.mock("@/hooks/useMultiStepFormContext");
const mockUseMultiStepFormContext = jest.mocked(useMultiStepFormContext);
mockUseMultiStepFormContext.mockReturnValue(mockContextValue);

const push = jest.fn();

jest.mock("next/navigation");
const mockedUseRouter = jest.mocked(useRouter);
mockedUseRouter.mockReturnValue({
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  push,
  replace: jest.fn(),
  prefetch: jest.fn(),
});

describe("RegisterFormStep2", () => {
  describe("Rendering", () => {
    it("should render the component", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const component = screen.getByTestId("RegisterFormStep2");
      expect(component).toBeInTheDocument();
    });

    it("should render header", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const component = screen.getByRole("heading", { name: /register/i });
      expect(component).toBeInTheDocument();
    });

    it("should render sub header", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const subHeader = screen.getByText(
        /enter your name and password to register\./i,
      );
      expect(subHeader).toBeInTheDocument();
    });

    it("shound render first name input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const firstNameInput = screen.getByRole("textbox", {
        name: /first name/i,
      });
      expect(firstNameInput).toBeInTheDocument();
    });

    it("should render last name input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
      expect(lastNameInput).toBeInTheDocument();
    });

    it("should render password input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const passwordInput = screen.getByLabelText(/enter password/i);
      expect(passwordInput).toBeInTheDocument();
    });

    it("should render confirm password input", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      expect(confirmPasswordInput).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const submitButton = screen.getByRole("button", { name: /continue/i });
      expect(submitButton).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should call nextStep on submit", async () => {
      const user = userEvent.setup();
      render(
        <MultiStepFormContext.Provider value={mockContextValue}>
          <RegisterStep2 />
        </MultiStepFormContext.Provider>,
      );
      const firstNameInput = screen.getByRole("textbox", {
        name: /first name/i,
      });
      await user.type(firstNameInput, "John");

      const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
      await user.type(lastNameInput, "Doe");

      const passwordInput = screen.getByLabelText(/enter password/i);
      await user.type(passwordInput, "password123");

      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      await user.type(confirmPasswordInput, "password123");

      const submitButton = screen.getByRole("button", { name: /continue/i });
      await user.click(submitButton);

      expect(push).toHaveBeenCalledTimes(1);
    });
  });
});
