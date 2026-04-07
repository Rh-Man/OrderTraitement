import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-red-600", className)}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
