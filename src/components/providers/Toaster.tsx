"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

type ThemeType = "light" | "dark" | "system" | undefined;

export default function Toaster() {
  const { theme } = useTheme();

  function isValidTheme(
    currentTheme: string | undefined,
  ): currentTheme is ThemeType {
    return (
      currentTheme === "light" ||
      currentTheme === "dark" ||
      currentTheme === "system" ||
      currentTheme === undefined
    );
  }

  return (
    <SonnerToaster richColors theme={isValidTheme(theme) ? theme : undefined} />
  );
}
