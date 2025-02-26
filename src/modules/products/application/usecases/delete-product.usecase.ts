import { ProductRepository } from "@products/infrastructure/repositories/product.repository";

export class DeleteProductUseCase {
  static instance: DeleteProductUseCase;

  constructor(private readonly repository: ProductRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DeleteProductUseCase(ProductRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(id: number) {
    return this.repository.delete(id);
  }
}
