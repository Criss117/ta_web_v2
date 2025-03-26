import type { Table } from "dexie";
import type { DebtPaymentPrimitive } from "./types";
import { Model } from "@shared/repositories";

export class DebtPaymentModel extends Model<DebtPaymentPrimitive> {
	static instance: DebtPaymentModel;

	private constructor(table: Table<DebtPaymentPrimitive>) {
		super(table);
	}

	static init(table: Table<DebtPaymentPrimitive>) {
		DebtPaymentModel.instance = new DebtPaymentModel(table);
	}

	static getInstance() {
		if (!DebtPaymentModel.instance) {
			throw new Error("DebtPaymentModel no inicializado");
		}
		return DebtPaymentModel.instance;
	}
}
