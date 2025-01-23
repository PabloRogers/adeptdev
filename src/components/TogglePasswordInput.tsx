import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

interface TogglePasswordInputProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
}

const TogglePasswordInput = forwardRef<
  HTMLInputElement,
  TogglePasswordInputProps
>(({ placeholder, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex w-full space-x-1">
      <Input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <Button
        className="bg-inherit"
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? (
          <Eye data-testid="eye" className="text-muted-foreground" />
        ) : (
          <EyeOff data-testid="eyeOff" className="text-muted-foreground" />
        )}
      </Button>
    </div>
  );
});

export default TogglePasswordInput;
