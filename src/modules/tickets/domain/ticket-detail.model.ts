import type { Table } from "dexie";
import { Model } from "@shared/repositories";
import type { TicketDetailPrimitive } from "./types";

export class TicketDetailModel extends Model<TicketDetailPrimitive> {
	static instance: TicketDetailModel;

	private constructor(table: Table<TicketDetailPrimitive>) {
		super(table);
	}

	static init(table: Table<TicketDetailPrimitive>) {
		TicketDetailModel.instance = new TicketDetailModel(table);
	}

	static getInstance() {
		if (!TicketDetailModel.instance) {
			throw new Error("TicketDetailModel no inicializado");
		}
		return TicketDetailModel.instance;
	}
}
