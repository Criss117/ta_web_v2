import { ProductRepository } from "@products/infrastructure/repositories/product.repository";
import type { ProductFormDto } from "@/modules/products/domain/types";

export class UpdateProductUseCase {
	private static instance: UpdateProductUseCase;

	constructor(private readonly productRepository: ProductRepository) {}

	static getInstance() {
		if (!UpdateProductUseCase.instance) {
			UpdateProductUseCase.instance = new UpdateProductUseCase(
				ProductRepository.getInstance(),
			);
		}
		return UpdateProductUseCase.instance;
	}

	public async execute(id: number, product: ProductFormDto) {
		return await this.productRepository.update(id, product);
	}
}
