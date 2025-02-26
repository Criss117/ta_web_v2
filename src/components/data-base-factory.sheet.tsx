import { useState, useTransition } from "react";
import { DEV } from "@shared/config/env.config";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Button } from "./ui/button";
import type { FactoryState } from "@shared/models/types";
import { factories } from "@shared/config/factories.config";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function DataBaseFactorySheet() {
  if (!DEV) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="absolute right-0">DB - Factories</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>List of factories</SheetTitle>
          <SheetDescription>
            Each factory is used to populate the database
          </SheetDescription>
        </SheetHeader>
        <Factories />
      </SheetContent>
    </Sheet>
  );
}

function Factories() {
  return (
    <div>
      {factories.map((factory) => (
        <Factory key={factory.name} factory={factory} />
      ))}
    </div>
  );
}

function Factory({ factory }: { factory: FactoryState }) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState(100);

  const handleClick = () => {
    startTransition(async () => {
      await factory.execute(amount);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <fieldset>
        <Label htmlFor="amount">Amount for {factory.name}</Label>
        <Input
          type="number"
          value={amount === 0 ? "" : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </fieldset>
      <Button onClick={handleClick} disabled={isPending}>
        {isPending ? "Executing..." : `Execute ${factory.name}`}
      </Button>
    </div>
  );
}
