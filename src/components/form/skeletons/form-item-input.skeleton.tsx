import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  label: string;
}

export function FormItemInputSkeleton({ label }: Props) {
  return (
    <div data-slot="form-item" className="grid gap-2">
      <Label
        data-slot="form-label"
        className="data-[error=true]:text-destructive-foreground"
      >
        {label}
      </Label>
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
