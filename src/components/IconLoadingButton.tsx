import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React from "react";

export interface IconLoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isExecuting: boolean;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export default function IconLoadingButton({
  isExecuting,
  Icon,
  text,
  ...props
}: IconLoadingButtonProps) {
  return (
    <Button disabled={isExecuting} {...props}>
      {isExecuting ? (
        <Loader2 data-testid="loader" className="animate-spin" />
      ) : (
        <Icon data-testid="icon" />
      )}
      {text}
    </Button>
  );
}
