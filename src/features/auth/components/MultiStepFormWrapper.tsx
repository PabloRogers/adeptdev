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
    <div className="flex w-[450px] flex-col items-center justify-center p-10">
      <div className="flex h-fit w-full flex-col items-center justify-center space-y-5">
        <div className="flex w-full justify-end">
          {!multiStepForm.isFirstStep && (
            <Button
              variant="ghost"
              onClick={multiStepForm.backStep}
              className="text-balance text-sm"
            >
              <ArrowLeft /> Back
            </Button>
          )}
        </div>
        <div className="w-full space-y-6">{children}</div>
        <div className="flex w-full items-center justify-center space-x-2">
          {Array.from({ length: multiStepForm.length }).map((_, index) => (
            <div
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
