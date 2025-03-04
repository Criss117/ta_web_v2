import { CreateTicketUseCase } from "@tickets/application/usecases/create-ticket.usecase";
import { TicketDetailStore } from "@/modules/tickets/domain/types";

export function useTickets() {
  const create = (
    ticketDetail: TicketDetailStore[],
    clientId: number | null
  ) => {
    return CreateTicketUseCase.getInstance().execute(ticketDetail, clientId);
  };

  return { create };
}
