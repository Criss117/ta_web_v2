import { DebtPaymentRepository } from "@debt-payment/infastructure/repositories/debt-payment.repository";

export class CreateDebtUsecase {
	static instance: CreateDebtUsecase;

	constructor(private readonly debtPaymentRepository: DebtPaymentRepository) {}

	public static getInstance() {
		if (!CreateDebtUsecase.instance) {
			CreateDebtUsecase.instance = new CreateDebtUsecase(
				DebtPaymentRepository.getInstance(),
			);
		}
		return CreateDebtUsecase.instance;
	}

	public async execute(amount: number, clientId: number) {
		return this.debtPaymentRepository.create(amount, clientId);
	}
}
