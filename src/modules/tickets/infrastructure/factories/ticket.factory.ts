import { ClientModel } from "@/modules/clients/domain/client.model";
import { FakerFacade } from "@shared/facades/faker.facade";
import { TicketModel } from "@/modules/tickets/domain/ticket.model";
import type { TicketPrimitive } from "@tickets/domain/types";

export class TicketFactory {
  static instance: TicketFactory;
  private tickets: TicketPrimitive[] = [];

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TicketFactory();
    }
    return this.instance;
  }

  public async execute(amount: number) {
    console.info("Executing...");
    FakerFacade.getFaker().then(async ({ faker }) => {
      const clients = await ClientModel.getInstance()
        .useTable()
        .then((table) => {
          return table.toArray();
        });

      if (clients.length === 0) {
        throw new Error("No hay clientes");
      }

      this.tickets = Array.from({ length: amount }, (_, i) => ({
        id: i + 1,
        clientId: faker.helpers.arrayElement(clients).id,
        total: faker.number.int({ min: 1, max: 100 }),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        deletedAt: null,
        isActive: true,
      }));

      const ticketTable = await TicketModel.getInstance().useTable();
      console.info("Clearing Table...");
      await ticketTable.clear();

      console.info("Inserting...");
      await ticketTable.bulkAdd(this.tickets);
      console.info("Done!");
    });
  }
}

export const ticketFactory = TicketFactory.getInstance();
