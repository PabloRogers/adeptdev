import UseMultiStepForm from "@/types/UseMultiStepForm";
import { createContext } from "react";

const MultiStepFormContext = createContext<
  UseMultiStepForm<unknown> | undefined
>(undefined);

export default MultiStepFormContext;
