import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: Props) {
  return (
    <header className={cn("px-10 py-2 bg-light-300", className)}>
      <h1 className="text-3xl font-bold text-lighttext-100">{children}</h1>
    </header>
  );
}

export function SectionTitleSkeleton({ children, className }: Props) {
  return (
    <header className={cn("px-10 py-2 bg-light-300", className)}>
      <h1 className="text-3xl font-bold text-lighttext-100">{children}</h1>
    </header>
  );
}
