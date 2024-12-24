"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "react-feather";

interface AuthFormProps {
  children: React.ReactNode;
}

export function AuthForm({ children }: AuthFormProps) {
  return (
    <div className="w-[450px] p-10">
      <div className="w-full space-y-8">{children}</div>
    </div>
  );
}

interface FormHeaderWrapperProps {
  children: React.ReactNode;
}

export function FormHeaderWrapper({ children }: FormHeaderWrapperProps) {
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

export function FormSeparator() {
  return (
    <div className="flex items-center justify-center">
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

export default function FormSubmitButton({
  isloading = false,
  children,
}: IFormSubmitButtonProps) {
  return (
    <Button className="w-full" type="submit" disabled={isloading}>
      {isloading && <Loader2 className="animate-spin" />}
      {!isloading && <LogIn />}
      {children}
    </Button>
  );
}

interface PasswordInputProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
}

export function PasswordInput({ placeholder, ...props }: PasswordInputProps) {
  const [isVisable, setIsVisable] = useState(false);
  return (
    <div className="flex w-full space-x-1">
      <Input
        type={isVisable ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        className="bg-inherit"
        type="button"
        variant="outline"
        size="icon"
        onClick={() => {
          setIsVisable((prev) => !prev);
        }}
      >
        {isVisable ? (
          <Eye className="text-muted-foreground" />
        ) : (
          <EyeOff className="text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}

AuthForm.HeaderWrapper = FormHeaderWrapper;
AuthForm.Separator = FormSeparator;
AuthForm.SubmitButton = FormSubmitButton;
AuthForm.MainHeader = MainHeader;
AuthForm.SubHeader = SubHeader;
AuthForm.PasswordInput = PasswordInput;
