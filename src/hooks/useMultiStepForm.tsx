import UseMultiStepForm from "@/types/UseMultiStepForm";
import { useState } from "react";

export default function useMultiStepForm<T>(
  initialFormData: T,
  initialSteps: React.ReactElement[],
): UseMultiStepForm<T> {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setStepsState] = useState<React.ReactElement[]>(initialSteps);
  const [formData, setFormData] = useState<T>(initialFormData);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function nextStep() {
    setCurrentStepIndex((index) => (isLastStep ? index : index + 1));
  }

  function backStep() {
    setCurrentStepIndex((index) => (isFirstStep ? index : index - 1));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  function setSteps(newSteps: React.ReactElement[]) {
    setStepsState(newSteps);
  }

  function setData(newFormData: Partial<T>) {
    setFormData((prevFormData) => ({ ...prevFormData, ...newFormData }));
  }

  const getData = () => formData;

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
    setData,
    getData,
  };
}
