import { ProductFormDto } from "@products/application/schemas/types";
import { ProductPrimitive } from "@products/domain/models/product.model";

export class ProductsMapper {
  public static formToDomain(product: ProductFormDto): ProductPrimitive {
    return {
      id: product.id || -1,
      barcode: product.barcode,
      description: product.description,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      stock: product.stock,
      minStock: product.minStock,
      deletedAt: null,
      isActive: true,
    };
  }

  public static prepareToCreate(
    product: ProductPrimitive
  ): Omit<ProductPrimitive, "id"> {
    return {
      barcode: product.barcode,
      description: product.description,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      stock: product.stock,
      minStock: product.minStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
      isActive: product.isActive,
    };
  }
}
