import { ProductRepository } from "@products/infrastructure/repositories/product.repository";

export class GetAllProductsUseCase {
  static instance: GetAllProductsUseCase;

  constructor(private readonly repository: ProductRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GetAllProductsUseCase(
        ProductRepository.getInstance()
      );
    }
    return this.instance;
  }

  public async execute(page: number, size: number = 10, query?: string) {
    // return this.repository.getAll();
    return this.repository.getPaginated(page, size, query);
  }
}
