import { DebtPaymentRepository } from "@debt-payment/infastructure/repositories/debt-payment.repository";

export class DeleteDebtUsecase {
	static instance: DeleteDebtUsecase;

	constructor(private readonly debtPaymentRepository: DebtPaymentRepository) {}

	public static getInstance() {
		if (!DeleteDebtUsecase.instance) {
			DeleteDebtUsecase.instance = new DeleteDebtUsecase(
				DebtPaymentRepository.getInstance(),
			);
		}
		return DeleteDebtUsecase.instance;
	}

	public async execute(id: number) {
		return this.debtPaymentRepository.remove(id);
	}
}
