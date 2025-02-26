import { ProductsMapper } from "@products/infrastructure/mappers/products.mapper";
import { ProductRepository } from "@products/infrastructure/repositories/product.repository";
import { ProductFormDto } from "../schemas/types";

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
    const productMapped = ProductsMapper.formToDomain(product);

    return await this.productRepository.edit(id, productMapped);
  }
}
