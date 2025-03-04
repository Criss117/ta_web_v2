import { useTransition } from "react";
import { Button } from "@ui/button";
import { LoaderComponent } from "@ui/loader-component";
import type { TicketDetailStore } from "@/modules/tickets/domain/types";
import { useTickets } from "@/modules/tickets/application/hooks/use.tickets";
import { toast } from "sonner";

interface Props {
  isCredit: boolean;
  ticketDetail: TicketDetailStore[];
  clientId: number | null;
}

export function PayModalActions({ isCredit, ticketDetail, clientId }: Props) {
  const [isPending, startTansition] = useTransition();
  const { create } = useTickets();

  const handleClick = () => {
    if (isCredit && clientId === null) {
      toast("Error", {
        description: "Debes seleccionar un cliente",
        style: {
          background: "var(--destructive)",
          borderColor: "var(--destructive)",
        },
      });

      return;
    }

    startTansition(async () => {
      await create(ticketDetail, null);

      toast("Venta registrada", {
        description: "La venta se ha registrado correctamente",
        style: {
          background: "var(--success)",
          borderColor: "var(--success)",
        },
      });
    });
  };

  return (
    <Button className="w-full" onClick={handleClick} disabled={isPending}>
      <LoaderComponent
        title="Cobrar solo registrando la venta"
        isLoading={isPending}
      />
    </Button>
  );
}
