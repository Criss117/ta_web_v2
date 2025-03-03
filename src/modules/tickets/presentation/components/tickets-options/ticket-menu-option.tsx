import { CircleXIcon, EraserIcon } from "lucide-react";
import { useStore } from "zustand";
import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { ticketsStore } from "@tickets/application/store/tickets.store";

interface Props {
  label: string;
  id: string;
}

export function TicketMenuOption({ label, id }: Props) {
  const deleteTicket = useStore(ticketsStore, (state) => state.deleteTicket);
  const clearTicket = useStore(ticketsStore, (state) => state.clearTicket);

  const onDelete = () => {
    deleteTicket(id);
  };

  const onClear = () => {
    clearTicket(id);
  };
  return (
    <>
      <ContextMenuLabel>{label}</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem
        className="hover:cursor-pointer space-x-2"
        onSelect={onClear}
      >
        <EraserIcon />
        <p>Limpiar</p>
      </ContextMenuItem>
      <ContextMenuItem
        className="hover:cursor-pointer space-x-2"
        onSelect={onDelete}
      >
        <CircleXIcon className="text-destructive" />
        <p className="text-destructive">Eliminar</p>
      </ContextMenuItem>
    </>
  );
}
