import type { Paginable } from "@shared/models/types";
import { ProductModel } from "@products/domain/product.model";
import { ProductsMapper } from "@products/infrastructure/mappers/products.mapper";
import type {
  ProductFormDto,
  ProductPrimitive,
} from "@/modules/products/domain/types";

export class ProductRepository {
  static instance: ProductRepository;

  constructor(private readonly productModel: ProductModel) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ProductRepository(ProductModel.getInstance());
    }
    return this.instance;
  }

  public async create(product: ProductFormDto) {
    const existingProduct = await this.productModel.getByField(
      "barcode",
      product.barcode
    );

    if (existingProduct) {
      throw new Error("El producto ya existe");
    }

    return this.productModel.add(ProductsMapper.prepareToCreate(product));
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

  public async update(id: number, product: ProductFormDto) {
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

    const updatedProduct = ProductsMapper.prepareToUpdate(
      existingProduct,
      product
    );

    return this.productModel.update(id, updatedProduct);
  }

  public async updateStock(barcode: string, quantity: number) {
    const existingProduct = await this.getByBarcode(barcode);

    if (!existingProduct) {
      throw new Error("El producto no existe");
    }

    return this.productModel.update(existingProduct.id, {
      stock: existingProduct.stock - quantity,
    });
  }

  public delete(id: number) {
    return this.productModel.softDelete(id, (product) => {
      product.deletedAt = new Date();
      product.isActive = false;
      return product;
    });
  }
}
