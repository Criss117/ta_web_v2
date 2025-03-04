import { CreateTicketUseCase } from "@tickets/application/usecases/create-ticket.usecase";
import { TicketDetailStore } from "@/modules/tickets/domain/types";
import { toast } from "sonner";

export function useTickets() {
  const create = async (
    ticketDetail: TicketDetailStore[],
    clientId: number | null
  ) => {
    const createUseCase = CreateTicketUseCase.getInstance();

    return createUseCase
      .execute(ticketDetail, clientId)
      .then(() => {
        toast("Venta registrada", {
          description: "La venta se ha registrado correctamente",
        });

        return {
          success: true,
          error: null,
        };
      })
      .catch((err) => {
        const message =
          err.error || err.message || "Ocurrió un error realizar la operación";

        toast("Error", {
          description: message,
          style: {
            background: "var(--destructive)",
            borderColor: "var(--destructive)",
          },
        });

        return {
          success: false,
          error: message as string,
        };
      });
  };

  return { create };
}
