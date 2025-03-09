import { TicketRepository } from "@tickets/infrastructure/repositories/ticket.repository";
import { TicketDetailRepository } from "@tickets/infrastructure/repositories/ticket-detail.repository";

export class GetTicketsByClientUseCase {
  static instance: GetTicketsByClientUseCase;

  constructor(
    private readonly ticketsRepository: TicketRepository,
    private readonly ticketDetailRepository: TicketDetailRepository
  ) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GetTicketsByClientUseCase(
        TicketRepository.getInstance(),
        TicketDetailRepository.getInstance()
      );
    }
    return this.instance;
  }

  public async findTickets(clientId: number) {
    return this.ticketsRepository.findByClientId(clientId);
  }

  public async findTicketsDetailByTicketId(ticketId: number) {
    return this.ticketDetailRepository.getManyByTicketId(ticketId);
  }
}
