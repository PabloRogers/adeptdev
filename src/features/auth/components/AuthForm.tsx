"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { Eye, EyeOff, LogIn } from "react-feather";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function AuthForm({ children, ...props }: AuthFormProps) {
  return (
    <div className="w-[450px] px-10" {...props}>
      <div className="w-full space-y-8">{children}</div>
    </div>
  );
}

interface FormHeaderWrapperProps {
  children: React.ReactNode;
}

function FormHeaderWrapper({ children }: FormHeaderWrapperProps) {
  return <div className="grid gap-2 text-center">{children}</div>;
}

interface MainHeaderProps {
  children: React.ReactNode;
}

function MainHeader({ children }: MainHeaderProps) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}

interface SubHeaderProps {
  children: React.ReactNode;
}

function SubHeader({ children }: SubHeaderProps) {
  return <p className="text-balance text-muted-foreground">{children}</p>;
}

function FormSeparator() {
  return (
    <div className="flex items-center justify-center" data-testid="separator">
      <hr className="flex-grow border-t" />
      <span className="px-2 text-sm text-neutral-400">or</span>
      <hr className="flex-grow border-t" />
    </div>
  );
}

interface IFormSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isloading?: boolean;
  children: React.ReactNode;
}

function FormSubmitButton({
  isloading = false,
  children,
}: IFormSubmitButtonProps) {
  return (
    <Button className="w-full" type="submit" disabled={isloading}>
      {isloading && <Loader2 data-testid="loader" className="animate-spin" />}
      {!isloading && <LogIn data-testid="login" />}
      {children}
    </Button>
  );
}

interface PasswordInputProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
}
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="flex w-full space-x-1">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          ref={ref} // Pass the forwarded ref here
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
  },
);

AuthForm.HeaderWrapper = FormHeaderWrapper;
AuthForm.Separator = FormSeparator;
AuthForm.SubmitButton = FormSubmitButton;
AuthForm.MainHeader = MainHeader;
AuthForm.SubHeader = SubHeader;
AuthForm.PasswordInput = PasswordInput;

export default AuthForm;
