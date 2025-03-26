import { DebtPaymentRepository } from "@debt-payment/infastructure/repositories/debt-payment.repository";

export class SettleDebtUsecase {
	static instance: SettleDebtUsecase;

	constructor(private readonly debtPaymentRepository: DebtPaymentRepository) {}

	public static getInstance() {
		if (!SettleDebtUsecase.instance) {
			SettleDebtUsecase.instance = new SettleDebtUsecase(
				DebtPaymentRepository.getInstance(),
			);
		}
		return SettleDebtUsecase.instance;
	}

	public async execute(clientId: number) {
		return this.debtPaymentRepository.settleDebt(clientId);
	}
}
