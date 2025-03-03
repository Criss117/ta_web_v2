import { PlusCircle } from "lucide-react";
import { useStore } from "zustand";
import { Button } from "@ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@ui/context-menu";
import { ticketsStore } from "@tickets/application/store/tickets.store";
import { TicketMenuOption } from "./ticket-menu-option";

export function TicketsNav() {
  const ticketsOnStore = useStore(ticketsStore, (state) => state.tickets);

  const currentTicketId = useStore(
    ticketsStore,
    (state) => state.selectedTicketId
  );
  const setCurrentTicketId = useStore(
    ticketsStore,
    (state) => state.setSelectedTicketId
  );
  const createTicket = useStore(ticketsStore, (state) => state.createTicket);

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
