"use client";

import { Button } from "@/components/ui/button";
import { useMultiStepFormContext } from "@/features/auth/context/MultiStepForm";
import { ArrowLeft } from "react-feather";

interface MultiStepFormWrapperProps {
  children: React.ReactNode;
}

export default function MultiStepFormWrapper({
  children,
}: MultiStepFormWrapperProps) {
  const multiStepForm = useMultiStepFormContext();
  const keys = ["step1", "step2", "step3"];
  return (
    <div className="flex flex-col w-[450px] justify-center items-center p-10">
      <div className="flex flex-col items-center h-fit justify-center w-full space-y-5">
        <div className="flex w-full justify-end">
          {!multiStepForm.isFirstStep && (
            <Button
              variant="ghost"
              onClick={multiStepForm.backStep}
              className="text-sm text-balance"
            >
              <ArrowLeft /> Back
            </Button>
          )}
        </div>
        <div className="w-full space-y-6">{children}</div>
        <div className="flex items-center justify-center w-full space-x-2">
          {Array.from({ length: multiStepForm.length }).map((_, index) => (
            <div
              key={keys[index]}
              className={`w-2 h-2 rounded-full ${
                index <= multiStepForm.currentStepIndex
                  ? "bg-primary"
                  : "bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
