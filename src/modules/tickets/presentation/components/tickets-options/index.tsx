import { SquarePercent } from "lucide-react";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { TicketsNav } from "./tickets-nav";

export function TicketsOptions() {
  return (
    <>
      <div className="bg-light-primary-200 w-full p-2 rounded-lg flex gap-x-2">
        <Button size="sm" className="space-x-2" variant="outline">
          <SquarePercent className="w-4 h-4" />
          <p>Buscar</p>
        </Button>
        <Button size="sm" className="space-x-2" variant="outline">
          <SquarePercent className="w-4 h-4" />
          <p>Mayoreo</p>
        </Button>
        <Separator orientation="vertical" />
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] h-9"
        ></div>
        <TicketsNav />
      </div>
    </>
  );
}
