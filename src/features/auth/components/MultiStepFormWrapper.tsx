"use client";

import { Button } from "@/components/ui/button";
import useMultiStepFormContext from "@/hooks/useMultiStepFormContext";
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
    <div
      className="flex flex-col items-center justify-center p-10"
      data-testid="MultiStepFormWrapper"
    >
      <div className="flex h-fit w-full flex-col items-center justify-center space-y-5">
        <div className="flex w-full px-10">
          {!multiStepForm.isFirstStep && (
            <div className="flex w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={multiStepForm.backStep}
                className="flex items-center text-balance text-sm"
              >
                <ArrowLeft /> <span>Back</span>
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-6">{children}</div>
        <div className="flex w-full items-center justify-center space-x-2">
          {Array.from({ length: multiStepForm.length }).map((_, index) => (
            <div
              data-testid="step-indicator"
              key={keys[index]}
              className={`h-2 w-2 rounded-full ${
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
