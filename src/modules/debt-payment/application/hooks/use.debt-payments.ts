import { CreateDebtUsecase } from "../usecases/create-debt.usecase";
import { DeleteDebtUsecase } from "../usecases/delete-debt.usecase";
import { FindManyDebtUsecase } from "../usecases/find-many-debt.usecase";
import { SettleDebtUsecase } from "../usecases/settle-debt.usecase";

export function useDebtPayments() {
	const create = async (amount: number, clientId: number) => {
		const createDebtPayment = CreateDebtUsecase.getInstance();

		return await createDebtPayment.execute(amount, clientId);
	};

	const findMany = async (clientId: number) => {
		const findDebtPayment = FindManyDebtUsecase.getInstance();

		return await findDebtPayment.execute(clientId);
	};

	const deleteDebt = async (id: number) => {
		const deleteDebtPayment = DeleteDebtUsecase.getInstance();

		return await deleteDebtPayment.execute(id);
	};

	const settleDebt = async (clientId: number) => {
		const settleDebtPayment = SettleDebtUsecase.getInstance();

		return await settleDebtPayment.execute(clientId);
	};

	return { create, findMany, deleteDebt, settleDebt };
}
