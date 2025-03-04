import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import { TicketModel } from "@/modules/tickets/domain/ticket.model";
import { TicketsMapper } from "@tickets/infrastructure/mappers/tickets.mapper";
import { TicketDetailRepository } from "@tickets/infrastructure/repositories/ticket-detail.repository";
import { TicketDetailMapper } from "@tickets/infrastructure/mappers/ticket-detail.mapper";
import type { TicketDetailStore } from "@/modules/tickets/domain/types";

export class TicketRepository {
  static instance: TicketRepository;

  constructor(
    private readonly ticketModel: TicketModel,
    private readonly clientRepository: ClientRepository
    // private readonly ticketDetailRepository: TicketDetailRepository
  ) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TicketRepository(
        TicketModel.getInstance(),
        ClientRepository.getInstance()
        // TicketDetailRepository.getInstance()
      );
    }
    return this.instance;
  }

  public async create(
    ticketDetail: TicketDetailStore[],
    clientId: number | null
  ) {
    const total = ticketDetail.reduce(
      (total, detail) => total + detail.subTotal,
      0
    );

    console.log({ ticketDetail, clientId, total });

    // if (clientId) {
    //   const client = await this.clientRepository.get(clientId);

    //   if (!client) {
    //     throw new Error("El cliente no existe");
    //   }
    // }

    // const ticketId = await this.ticketModel.put(
    //   TicketsMapper.prepareToCreate(total, clientId)
    // );

    // await this.ticketDetailRepository.createMany(
    //   TicketDetailMapper.prepareManyToCreate(ticketDetail, ticketId)
    // );

    // return ticketId;

    return "1";
  }
}
