import { DebtPaymentModel } from "@debt-payment/domain/debt-payment.model";
import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import { TicketRepository } from "@tickets/infrastructure/repositories/ticket.repository";

export class DebtPaymentRepository {
	static instance: DebtPaymentRepository;

	private constructor(
		private readonly debtPaymentModel: DebtPaymentModel,
		private readonly clientRepository: ClientRepository,
		private readonly ticketRepository: TicketRepository,
	) {}

	public static getInstance() {
		if (!DebtPaymentRepository.instance) {
			DebtPaymentRepository.instance = new DebtPaymentRepository(
				DebtPaymentModel.getInstance(),
				ClientRepository.getInstance(),
				TicketRepository.getInstance(),
			);
		}
		return DebtPaymentRepository.instance;
	}

	public async getManyByClientId(clientId: number) {
		return this.debtPaymentModel.getManyByField("clientId", clientId);
	}

	public async create(amount: number, clientId: number) {
		const client = await this.clientRepository.get(clientId);

		if (!client) {
			throw new Error("El cliente no existe");
		}

		const newBalance = client.balance - amount;

		if (newBalance < 0) {
			throw new Error("EL abono excede el saldo");
		}

		await this.clientRepository.updateBalance(
			clientId,
			client.balance - amount,
		);

		return this.debtPaymentModel.add({
			amount,
			lastBalance: client.balance,
			clientId,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			isActive: true,
		});
	}

	public async remove(id: number) {
		const debtPayment = await this.debtPaymentModel.getById(id);

		if (!debtPayment) {
			throw new Error("El abono no existe");
		}

		const client = await this.clientRepository.get(debtPayment.clientId);

		if (!client) {
			throw new Error("El cliente no existe");
		}

		const newBalance = client.balance + debtPayment.amount;

		if (newBalance < 0) {
			throw new Error("EL abono excede el saldo");
		}

		await this.clientRepository.updateBalance(client.id, newBalance);

		return this.debtPaymentModel.delete(id);
	}

	public async settleDebt(clientId: number) {
		const debtPayment = await this.debtPaymentModel.getManyByField(
			"clientId",
			clientId,
		);

		if (!debtPayment) {
			throw new Error("Debt payment not found");
		}

		const debtPromises = debtPayment.map((debtPayment) => {
			return this.debtPaymentModel.update(debtPayment.id, {
				deletedAt: new Date(),
				isActive: false,
			});
		});

		await Promise.all(debtPromises);

		await this.ticketRepository.settleDebt(clientId);

		await this.clientRepository.settleDebt(clientId);
	}
}
