import type { Paginable } from "@shared/models/types";
import {
  ProductModel,
  type ProductPrimitive,
} from "@products/domain/models/product.model";
import { ProductsMapper } from "../mappers/products.mapper";

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

    product.createdAt = new Date();

    return this.productModel.add(ProductsMapper.prepareToCreate(product));
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
    const existingProduct = await this.productModel.getByField("id", id);

    if (!existingProduct) {
      throw new Error("El producto no existe");
    }

    if (product.barcode !== existingProduct.barcode) {
      const existingBarcode = await this.productModel.getByField(
        "barcode",
        product.barcode
      );

      if (existingBarcode) {
        throw new Error("El codigo de barras ya está registrado");
      }
    }

    product.updatedAt = new Date();

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
