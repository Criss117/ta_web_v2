import { CreateDebtUsecase } from "../usecases/create-debt.usecase";

export function useDebtPayments() {
	const create = async (amount: number, clientId: number) => {
		const createDebtPayment = CreateDebtUsecase.getInstance();

		return await createDebtPayment.execute(amount, clientId);
	};

	return { create };
}
