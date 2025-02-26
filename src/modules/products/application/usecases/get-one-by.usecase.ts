import { ProductRepository } from "@products/infrastructure/repositories/product.repository";

export class GetOneByUseCase {
  static instance: GetOneByUseCase;

  constructor(private readonly repository: ProductRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GetOneByUseCase(ProductRepository.getInstance());
    }
    return this.instance;
  }

  public async barcode(barcode: string) {
    return this.repository.getByBarcode(barcode);
  }
}
