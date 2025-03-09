import { FakerFacade } from "@shared/facades/faker.facade";
import { ProductModel } from "@products/domain/product.model";
import type { ProductPrimitive } from "@products/domain/types";

export class ProductFactory {
	static instance: ProductFactory;
	private products: ProductPrimitive[] = [];

	private constructor() {}

	public static getInstance() {
		if (!ProductFactory.instance) {
			ProductFactory.instance = new ProductFactory();
		}
		return ProductFactory.instance;
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
