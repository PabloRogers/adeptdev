export default interface UseMultiStepForm<T> {
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
  setData: (newFormData: Partial<T>) => void;
  getData: () => T;
}
