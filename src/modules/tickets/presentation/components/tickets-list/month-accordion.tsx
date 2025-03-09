import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import { Accordion } from "@ui/accordion";
import { DAYS, MONTHS } from "@/lib/constants/months";
import { AccorItem } from "./accor-item";
import type { TicketMonth } from "@tickets/domain/types";

interface Props extends PropsWithChildren {
  ticketsList: TicketMonth;
  className?: string;
  selectTicket: (ticketId: number) => void;
}

export const MonthAccordion = ({
  ticketsList,
  className,
  selectTicket,
}: Props) => {
  return (
    <Accordion
      className={cn("mt-2 px-3 space-y-2", className)}
      type="single"
      collapsible
    >
      {Object.keys(ticketsList).map((monthStr, index) => {
        const month = Number(monthStr);
        return (
          <AccorItem
            key={index}
            value={`${monthStr}`}
            trigger={MONTHS[month]}
            className="px-2 bg-light-primary-300 shadow text-white"
          >
            <div className="flex flex-col gap-y-2 mt-2 px-2">
              {ticketsList[month].map((ticket) => (
                <Button
                  key={ticket.id}
                  variant="secondary"
                  className={cn("h-6 bg-light-primary-100 shadow")}
                  onClick={() => {
                    selectTicket(ticket.id);
                  }}
                >
                  <span>{ticket.day}</span> - <span>{DAYS[ticket.dayId]}</span>
                </Button>
              ))}
            </div>
          </AccorItem>
        );
      })}
    </Accordion>
  );
};
