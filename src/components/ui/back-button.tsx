import { cn } from "@/lib/utils";
import { Button } from "./button";

export function BackButton({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => window.history.back()}
      className={cn(className)}
      variant="link"
    >
      Volver
    </Button>
  );
}
