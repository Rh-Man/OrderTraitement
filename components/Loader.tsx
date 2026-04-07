import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  label?: string;
}

export function Loader({ className, label = "Chargement..." }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2 text-slate-400", className)}>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
