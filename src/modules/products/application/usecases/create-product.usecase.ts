import { ProductRepository } from "@products/infrastructure/repositories/product.repository";
import { ProductsMapper } from "@products/infrastructure/mappers/products.mapper";
import type { ProductFormDto } from "../schemas/types";

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
    const productMapped = ProductsMapper.formToDomain(product);

    return this.repository.create(productMapped);
  }
}
