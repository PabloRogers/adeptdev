import { createContext, useContext } from "react";
import { TUseMultiStepFormReturn } from "../../../hooks/useMultiStepForm";

export const MultiStepFormContext = createContext<
  TUseMultiStepFormReturn<unknown> | undefined
>(undefined);

export function useMultiStepFormContext<T>() {
  const multiStepForm = useContext(MultiStepFormContext) as
    | TUseMultiStepFormReturn<T>
    | undefined;

  if (multiStepForm === undefined) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepFormContext.Provider",
    );
  }

  return multiStepForm;
}
