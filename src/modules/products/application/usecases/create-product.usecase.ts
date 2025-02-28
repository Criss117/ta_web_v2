import { ProductRepository } from "@products/infrastructure/repositories/product.repository";
import type { ProductFormDto } from "@products/domain/schemas/types";

export class CreateProductUseCase {
  static instance: CreateProductUseCase;

  constructor(private readonly repository: ProductRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CreateProductUseCase(ProductRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(product: ProductFormDto) {
    return this.repository.create(product);
  }
}
