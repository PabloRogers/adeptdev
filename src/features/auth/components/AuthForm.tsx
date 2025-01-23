"use client";

import React from "react";

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

interface HeaderWrapperProps {
  children: React.ReactNode;
}

function HeaderWrapper({ children }: HeaderWrapperProps) {
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

AuthForm.HeaderWrapper = HeaderWrapper;
AuthForm.Separator = FormSeparator;
AuthForm.MainHeader = MainHeader;
AuthForm.SubHeader = SubHeader;

export default AuthForm;
