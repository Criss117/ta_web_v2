import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { useDebounce } from "@shared/hooks/use.debounce";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  labelClass?: string;
  defaultValue?: string;
  searchByQueryFn?: (query: string) => void;
}

export const SearchBarQuery = ({
  label,
  defaultValue,
  labelClass,
  searchByQueryFn,
}: Props) => {
  const [query, setQuery] = useState(defaultValue || "");
  const queryDebaunce = useDebounce(query, 500);

  const clearQuery = () => {
    setQuery("");
  };
  useEffect(() => {
    if (!searchByQueryFn) return;
    if (queryDebaunce.length >= 3 || queryDebaunce.length === 0) {
      searchByQueryFn(queryDebaunce);
      return;
    }
  }, [queryDebaunce]);

  return (
    <div className="grid w-full max-w-xl items-center gap-1.5 relative">
      <Label htmlFor="query" className={cn(labelClass)}>
        {label}
      </Label>
      <Input
        type="text"
        id="query"
        placeholder={label}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value.trim());
        }}
      />
      <Button
        variant="ghost"
        className="absolute right-0 bottom-0 bg-transparent hover:bg-transparent"
        aria-label="Clear query"
        onClick={clearQuery}
      >
        <X />
      </Button>
    </div>
  );
};
