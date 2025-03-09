import { ProductRepository } from "@products/infrastructure/repositories/product.repository";
import type { ProductFormDto } from "@products/domain/types";

export class CreateProductUseCase {
	static instance: CreateProductUseCase;

	constructor(private readonly repository: ProductRepository) {}

	public static getInstance() {
		if (!CreateProductUseCase.instance) {
			CreateProductUseCase.instance = new CreateProductUseCase(
				ProductRepository.getInstance(),
			);
		}
		return CreateProductUseCase.instance;
	}

	public async execute(product: ProductFormDto) {
		return this.repository.create(product);
	}
}
