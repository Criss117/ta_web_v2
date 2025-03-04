import { TicketRepository } from "@tickets/infrastructure/repositories/ticket.repository";
import type { TicketDetailStore } from "@/modules/tickets/domain/types";

export class CreateTicketUseCase {
  static instance: CreateTicketUseCase;

  private constructor(private readonly ticketRepository: TicketRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CreateTicketUseCase(TicketRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(
    ticketDetail: TicketDetailStore[],
    clientId: number | null
  ) {
    return this.ticketRepository.create(ticketDetail, clientId);
  }
}
