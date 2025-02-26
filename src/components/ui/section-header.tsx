import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: Props) {
  return (
    <header className={cn("mx-10 flex justify-between", className)}>
      {children}
    </header>
  );
}
