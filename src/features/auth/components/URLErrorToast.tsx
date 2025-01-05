"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface URLErrorToastProps {
  error: string | null;
}

export default function URLErrorToast({ error }: URLErrorToastProps) {
  useEffect(() => {
    if (error) toast.error(error);
  }, []);
  return null;
}
