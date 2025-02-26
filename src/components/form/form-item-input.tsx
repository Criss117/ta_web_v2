import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";

interface Props<T> {
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute | undefined;
  field: T;
  hidden?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

export function FormItemInput<T>({
  label,
  placeholder,
  type,
  field,
  hidden = false,
  className,
  min,
  max,
}: Props<T>) {
  return (
    <FormItem hidden={hidden} className={cn(className)}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          {...field}
          type={type}
          min={min}
          max={max}
        />
      </FormControl>
      <FormMessage className="bg-destructive/20 border-l-4 border-destructive" />
    </FormItem>
  );
}
