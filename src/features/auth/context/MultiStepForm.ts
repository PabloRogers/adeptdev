import { createContext, useContext } from "react";
import { TUseMultiStepFormReturn } from "../hooks/useMultiStepForm";

export const MultiStepFormContext = createContext<
  TUseMultiStepFormReturn | undefined
>(undefined);

export function useMultiStepFormContext() {
  const multiStepForm = useContext(MultiStepFormContext);

  if (multiStepForm === undefined) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepFormContext.Provider",
    );
  }

  return multiStepForm;
}
