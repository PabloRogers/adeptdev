import { useCallback, useState } from "react";

export interface TUseMultiStepFormReturn<T> {
  currentStepIndex: number;
  steps: React.ReactElement[];
  step: React.ReactElement;
  formData: T;
  isFirstStep: boolean;
  isLastStep: boolean;
  length: number;
  goTo: (index: number) => void;
  nextStep: () => void;
  backStep: () => void;
  setSteps: (newSteps: React.ReactElement[]) => void;
  setMultiFormData: (newFormData: Partial<T>) => void;
  getMultiFormData: () => T;
}

export default function useMultiStepForm<T>(
  initialFormData: T,
): TUseMultiStepFormReturn<T> {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setStepsState] = useState<React.ReactElement[]>([]);
  const [formData, setFormData] = useState<T>(initialFormData);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const nextStep = useCallback(() => {
    setCurrentStepIndex((index) => (isLastStep ? index : index + 1));
  }, [isLastStep]);

  const backStep = useCallback(() => {
    setCurrentStepIndex((index) => (isFirstStep ? index : index - 1));
  }, [isFirstStep]);

  const goTo = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  const setSteps = useCallback((newSteps: React.ReactElement[]) => {
    setStepsState(newSteps);
  }, []);

  const setMultiFormData = useCallback((newFormData: Partial<T>) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...newFormData }));
  }, []);

  const getMultiFormData = useCallback(() => formData, [formData]);

  return {
    currentStepIndex,
    steps,
    step: steps[currentStepIndex],
    formData,
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
