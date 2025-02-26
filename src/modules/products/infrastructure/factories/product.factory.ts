import { FakerFacade } from "@shared/facades/faker.facade";
import {
  ProductModel,
  ProductPrimitive,
} from "@products/domain/models/product.model";

export class ProductFactory {
  static instance: ProductFactory;
  private products: ProductPrimitive[] = [];

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ProductFactory();
    }
    return this.instance;
  }

  public async execute(amount: number) {
    console.info("Executing...");
    FakerFacade.getFaker().then(async ({ faker }) => {
      this.products = Array.from({ length: amount }, (_, i) => ({
        id: i + 1,
        description: faker.commerce.productName(),
        barcode: faker.commerce.isbn({ separator: "" }),
        costPrice: Number(faker.commerce.price()),
        salePrice: Number(faker.commerce.price()),
        wholesalePrice: Number(faker.commerce.price()),
        minStock: faker.number.int({ min: 0, max: 100 }),
        maxStock: faker.number.int({ min: 0, max: 100 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        deletedAt: null,
        isActive: true,
      }));
      const productTable = await ProductModel.getInstance().useTable();
      console.info("Clearing Table...");
      await productTable.clear();

      console.info("Inserting...");
      await productTable.bulkAdd(this.products);
      console.info("Done!");
    });
  }
}

export const productFactory = ProductFactory.getInstance();
