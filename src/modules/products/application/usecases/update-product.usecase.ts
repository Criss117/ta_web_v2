import { ProductRepository } from "@products/infrastructure/repositories/product.repository";
import type { ProductFormDto } from "@/modules/products/domain/types";

export class UpdateProductUseCase {
  private static instance: UpdateProductUseCase;

  constructor(private readonly productRepository: ProductRepository) {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new UpdateProductUseCase(ProductRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(id: number, product: ProductFormDto) {
    return await this.productRepository.update(id, product);
  }
}
