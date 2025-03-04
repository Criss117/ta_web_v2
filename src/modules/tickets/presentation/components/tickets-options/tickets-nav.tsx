import { PlusCircle } from "lucide-react";
import { Button } from "@ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@ui/context-menu";
import { useTicketsStore } from "@tickets/application/store/tickets.store";
import { TicketMenuOption } from "./ticket-menu-option";

export function TicketsNav() {
  const ticketsOnStore = useTicketsStore((state) => state.tickets);
  const currentTicketId = useTicketsStore((state) => state.selectedTicketId);
  const createTicket = useTicketsStore((state) => state.createTicket);

  const setCurrentTicketId = useTicketsStore(
    (state) => state.setSelectedTicketId
  );

  const tickets = ticketsOnStore.map(
    ({ temporaryId, ticketNumber, ticketName }) => ({
      label: ticketName ?? `Ticket ${ticketNumber}`,
      id: temporaryId,
      onClick: () => {
        setCurrentTicketId(temporaryId);
      },
    })
  );

  return (
    <>
      {tickets.map((t) => (
        <ContextMenu key={t.id}>
          <ContextMenuTrigger>
            <Button
              asChild
              size="sm"
              className="hover:cursor-pointer min-w-20"
              variant={t.id === currentTicketId ? "default" : "outline"}
              onClick={t.onClick}
            >
              <p>{t.label}</p>
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent className="py-2">
            <TicketMenuOption label={t.label} id={t.id} />
          </ContextMenuContent>
        </ContextMenu>
      ))}
      {tickets.length !== 10 && (
        <Button variant="outline" size="sm" onClick={createTicket}>
          <PlusCircle />
        </Button>
      )}
    </>
  );
}
