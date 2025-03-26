import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import { TicketModel } from "@tickets/domain/ticket.model";
import { TicketsMapper } from "@tickets/infrastructure/mappers/tickets.mapper";
import { TicketDetailRepository } from "@tickets/infrastructure/repositories/ticket-detail.repository";
import { TicketDetailMapper } from "@tickets/infrastructure/mappers/ticket-detail.mapper";
import type { TicketDetailStore, TicketPrimitive } from "@tickets/domain/types";

export class TicketRepository {
	static instance: TicketRepository;

	constructor(
		private readonly ticketModel: TicketModel,
		private readonly clientRepository: ClientRepository,
		private readonly ticketDetailRepository: TicketDetailRepository,
	) {}

	public static getInstance() {
		if (!TicketRepository.instance) {
			TicketRepository.instance = new TicketRepository(
				TicketModel.getInstance(),
				ClientRepository.getInstance(),
				TicketDetailRepository.getInstance(),
			);
		}
		return TicketRepository.instance;
	}

	public async create(
		ticketDetail: TicketDetailStore[],
		clientId: number | null,
	) {
		const total = ticketDetail.reduce(
			(total, detail) => total + detail.subTotal,
			0,
		);

		if (clientId) {
			const client = await this.clientRepository.get(clientId);

			if (!client) {
				throw new Error("El cliente no existe");
			}

			const newBalance = client.balance + total;

			if (newBalance < 0 || newBalance > client.creditLimit) {
				throw new Error("El balance no es correcto");
			}

			await this.clientRepository.updateBalance(clientId, newBalance);
		}

		const ticketId = await this.ticketModel.put(
			TicketsMapper.prepareToCreate(total, clientId),
		);

		await this.ticketDetailRepository.createMany(
			TicketDetailMapper.prepareManyToCreate(ticketDetail, ticketId),
		);

		return ticketId;
	}

	public async findByClientId(clientId: number): Promise<TicketPrimitive[]> {
		return (await this.ticketModel.getManyByField("clientId", clientId)).filter(
			(t) => t.isActive === true,
		);
	}

	public async settleDebt(clientId: number) {
		const tickets = await this.ticketModel.getManyByField("clientId", clientId);

		if (!tickets) {
			throw new Error("Debt payment not found");
		}

		const promises = tickets.map((ticket) => {
			return this.ticketModel.update(ticket.id, {
				deletedAt: new Date(),
				isActive: false,
			});
		});

		return Promise.all(promises);
	}
}
