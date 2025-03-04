import { Model } from "@shared/repositories";
import { TicketPrimitive } from "./types";
import { Table } from "dexie";

export class TicketModel extends Model<TicketPrimitive> {
  static instance: TicketModel;

  private constructor(table: Table<TicketPrimitive>) {
    super(table);
  }

  static init(table: Table<TicketPrimitive>) {
    TicketModel.instance = new TicketModel(table);
  }

  static getInstance() {
    if (!this.instance) {
      throw new Error("TicketModel no inicializado");
    }
    return this.instance;
  }
}
