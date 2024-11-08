import { ReactElement, useCallback, useState } from "react";

interface TRegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  verificationPin: string;
}

export interface TUseMultiStepFormReturn {
  currentStepIndex: number;
  step: ReactElement | null;
  isFirstStep: boolean;
  isLastStep: boolean;
  length: number;

  goTo: (index: number) => void;
  nextStep: () => void;
  backStep: () => void;
  setSteps: (steps: ReactElement[]) => void;
  setMultiFormData: (newFormData: Partial<TRegisterFormData>) => void;
  getMultiFormData: () => TRegisterFormData;
}

export default function useMultiStepForm(): TUseMultiStepFormReturn {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setStepsState] = useState<ReactElement[]>([]);
  const [formData, setFormData] = useState<TRegisterFormData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    verificationPin: "",
  });

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const nextStep = useCallback(() => {
    setCurrentStepIndex((index) => (isLastStep ? index : index + 1));
  }, [isLastStep]);

  const backStep = useCallback(() => {
    setCurrentStepIndex((index) => (isFirstStep ? index : index - 1));
  }, [isFirstStep]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentStepIndex((prevIndex) =>
        index < 0 || index >= steps.length ? prevIndex : index,
      );
    },
    [steps.length],
  );

  const getMultiFormData = useCallback(() => {
    return formData;
  }, [formData]);

  const setMultiFormData = useCallback(
    (newFormData: Partial<typeof formData>) => {
      setFormData((prevData) => ({
        ...prevData,
        ...newFormData,
      }));
    },
    [],
  );

  const setSteps = useCallback((newSteps: ReactElement[]) => {
    setStepsState(newSteps);
    setCurrentStepIndex((prevIndex) =>
      prevIndex >= newSteps.length ? newSteps.length - 1 : prevIndex,
    );
  }, []);

  return {
    currentStepIndex,
    step: steps[currentStepIndex] || null,
    isFirstStep,
    isLastStep,
    length: steps.length,
    goTo,
    nextStep,
    backStep,
    setSteps,
    setMultiFormData,
    getMultiFormData,
  };
}
