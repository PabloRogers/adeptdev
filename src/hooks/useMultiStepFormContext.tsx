"use client";

import MultiStepFormContext from "@/context/useMultiStepForm";
import UseMultiStepForm from "@/types/UseMultiStepForm";
import { useContext } from "react";

export default function useMultiStepFormContext<T>() {
  const multiStepForm = useContext(MultiStepFormContext) as
    | UseMultiStepForm<T>
    | undefined;

  if (multiStepForm === undefined) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepFormContext.Provider",
    );
  }

  return multiStepForm;
}
