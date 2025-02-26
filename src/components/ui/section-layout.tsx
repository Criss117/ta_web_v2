import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SectionLayout({ children, className }: Props) {
  return (
    <section className={cn("border mt-10 mx-5 py-10 rounded-xl", className)}>
      {children}
    </section>
  );
}
