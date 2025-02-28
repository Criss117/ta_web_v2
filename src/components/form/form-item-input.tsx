import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";

interface Props<T> extends React.ComponentProps<"input"> {
  label: string;
  placeholder?: string;
  field: T;
  hidden?: boolean;
  className?: string;
}

export function FormItemInput<T>({
  label,
  field,
  hidden = false,
  className,
  ...props
}: Props<T>) {
  return (
    <FormItem hidden={hidden} className={cn(className)}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...field} {...props} />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
}
