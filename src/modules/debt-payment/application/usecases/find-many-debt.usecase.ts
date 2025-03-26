import { DebtPaymentRepository } from "@debt-payment/infastructure/repositories/debt-payment.repository";

export class FindManyDebtUsecase {
	static instance: FindManyDebtUsecase;

	constructor(private readonly debtPaymentRepository: DebtPaymentRepository) {}

	public static getInstance() {
		if (!FindManyDebtUsecase.instance) {
			FindManyDebtUsecase.instance = new FindManyDebtUsecase(
				DebtPaymentRepository.getInstance(),
			);
		}
		return FindManyDebtUsecase.instance;
	}

	public async execute(clientId: number) {
		return this.debtPaymentRepository.getManyByClientId(clientId);
	}
}
