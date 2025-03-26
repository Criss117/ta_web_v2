import { DebtPaymentModel } from "@debt-payment/domain/debt-payment.model";
import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class DebtPaymentReposiory {
	static instance: DebtPaymentReposiory;

	private constructor(
		private readonly debtPaymentModel: DebtPaymentModel,
		private readonly clientRepository: ClientRepository,
	) {}

	public static getInstance() {
		if (!DebtPaymentReposiory.instance) {
			DebtPaymentReposiory.instance = new DebtPaymentReposiory(
				DebtPaymentModel.getInstance(),
				ClientRepository.getInstance(),
			);
		}
		return DebtPaymentReposiory.instance;
	}

	public async getManyByClientId(clientId: string) {
		return this.debtPaymentModel.getByField("clientId", clientId);
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
}
