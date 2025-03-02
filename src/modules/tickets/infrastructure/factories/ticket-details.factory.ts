import { FakerFacade } from "@shared/facades/faker.facade";
import { TicketModel } from "@tickets/domain/models/ticket.model";
import {
  TicketDetailModel,
  type TicketDetailPrimitive,
} from "@tickets/domain/models/ticket-detail.model";
import { ProductModel } from "@products/domain/product.model";

export class TicketDetailsFactory {
  static instance: TicketDetailsFactory;
  private ticketDetails: TicketDetailPrimitive[] = [];

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TicketDetailsFactory();
    }
    return this.instance;
  }

  public async execute(amount: number) {
    console.info("Executing...");
    FakerFacade.getFaker().then(async ({ faker }) => {
      const ticketsPromise = TicketModel.getInstance()
        .useTable()
        .then((table) => table.toArray());

      const productsPromise = ProductModel.getInstance()
        .useTable()
        .then((table) => table.toArray());

      const [tickets, products] = await Promise.all([
        ticketsPromise,
        productsPromise,
      ]);

      if (tickets.length === 0 || products.length === 0) {
        throw new Error("No hay tickets");
      }

      console.info("Inserting...");
      this.ticketDetails = Array.from({ length: amount }, (_, i) => {
        const ticket = faker.helpers.arrayElement(tickets);
        const product = faker.helpers.arrayElement(products);

        const amount = faker.number.int({ min: 1, max: 100 });
        const subTotal = product.salePrice * ticket.total;
        return {
          id: i + 1,
          ticketId: ticket.id,
          barcode: product.barcode,
          description: product.description,
          price: product.salePrice,
          amount: amount,
          subTotal: subTotal,
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
          deletedAt: null,
          isActive: true,
        };
      });

      const ticketDetailTable =
        await TicketDetailModel.getInstance().useTable();
      console.info("Clearing Table...");
      await ticketDetailTable.clear();

      console.info("Inserting...");
      await ticketDetailTable.bulkAdd(this.ticketDetails);
      console.info("Done!");
    });
  }
}

export const ticketDetailsFactory = TicketDetailsFactory.getInstance();
