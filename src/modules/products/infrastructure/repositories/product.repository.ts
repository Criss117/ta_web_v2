import type { Paginable } from "@shared/models/types";
import {
  ProductModel,
  type ProductPrimitive,
} from "@products/domain/models/product.model";

export class ProductRepository {
  static instance: ProductRepository;

  constructor(private readonly productModel: ProductModel) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ProductRepository(ProductModel.getInstance());
    }
    return this.instance;
  }

  public async create(product: ProductPrimitive) {
    const existingProduct = await this.productModel.getByField(
      "barcode",
      product.barcode
    );

    if (existingProduct) {
      throw new Error("El producto ya existe");
    }

    delete product.id;
    product.createdAt = new Date();

    return this.productModel.add(product);
  }

  public getAll() {
    return this.productModel.getAll();
  }

  public async getByBarcode(barcode: string) {
    return this.productModel.getByField("barcode", barcode);
  }

  public async getPaginated(
    page: number,
    size: number,
    query?: string
  ): Promise<Paginable<ProductPrimitive>> {
    if (query) {
      return this.productModel.getPaginatedAndQuery(page, size, query);
    }

    return this.productModel.getPaginated(page, size);
  }

  public async edit(id: number, product: ProductPrimitive) {
    const existingProduct = await this.productModel.getByField(
      "barcode",
      product.barcode
    );

    if (!existingProduct) {
      throw new Error("El producto no existe");
    }

    product.updatedAt = new Date();
    delete product.id;

    return this.productModel.update(id, product);
  }

  public delete(id: number) {
    return this.productModel.softDelete(id, (product) => {
      product.deletedAt = new Date();
      product.isActive = false;
      return product;
    });
  }
}
