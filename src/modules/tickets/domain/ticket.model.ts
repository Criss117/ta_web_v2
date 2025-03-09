import type { Table } from "dexie";
import { Model } from "@shared/repositories";
import type { TicketPrimitive } from "./types";

export class TicketModel extends Model<TicketPrimitive> {
	static instance: TicketModel;

	private constructor(table: Table<TicketPrimitive>) {
		super(table);
	}

	static init(table: Table<TicketPrimitive>) {
		TicketModel.instance = new TicketModel(table);
	}

	static getInstance() {
		if (!TicketModel.instance) {
			throw new Error("TicketModel no inicializado");
		}
		return TicketModel.instance;
	}
}
