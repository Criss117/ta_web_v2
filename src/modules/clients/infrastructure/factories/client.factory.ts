import { FakerFacade } from "@shared/facades/faker.facade";
import { ClientModel } from "@clients/domain/client.model";
import type { ClientPrimitive } from "@clients/domain/types";

export class ClientFactory {
  static instance: ClientFactory;
  private clients: ClientPrimitive[] = [];

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ClientFactory();
    }
    return this.instance;
  }

  public async execute(amount: number) {
    console.info("Executing...");
    FakerFacade.getFaker().then(async ({ faker }) => {
      this.clients = Array.from({ length: amount }, (_, i) => ({
        id: i + 1,
        identifier: faker.commerce.isbn({ separator: "" }),
        fullName: faker.person.fullName(),
        address: faker.location.streetAddress(),
        phone: faker.number
          .bigInt({ min: 1000000000, max: 9999999999 })
          .toString(),
        creditLimit: Number(faker.commerce.price()),
        balance: Number(faker.commerce.price()),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        deletedAt: null,
        isActive: true,
      }));
      const clientTable = await ClientModel.getInstance().useTable();
      console.info("Clearing Table...");
      await clientTable.clear();

      console.info("Inserting...");
      await clientTable.bulkAdd(this.clients);
      console.info("Done!");
    });
  }
}

export const clientFactory = ClientFactory.getInstance();
