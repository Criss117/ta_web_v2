import type {
  ProductFormDto,
  ProductPrimitive,
} from "@/modules/products/domain/types";

export class ProductsMapper {
  public static prepareToCreate(
    product: ProductFormDto
  ): Omit<ProductPrimitive, "id"> {
    return {
      barcode: product.barcode,
      description: product.description,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      wholesalePrice: product.wholesalePrice,
      stock: product.stock,
      minStock: product.minStock,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isActive: true,
    };
  }

  public static prepareToUpdate(
    oldData: ProductPrimitive,
    newData: ProductFormDto
  ): ProductPrimitive {
    return {
      id: oldData.id,
      barcode: newData.barcode,
      description: newData.description,
      costPrice: newData.costPrice,
      salePrice: newData.salePrice,
      wholesalePrice: newData.wholesalePrice,
      stock: newData.stock,
      minStock: newData.minStock,
      createdAt: oldData.createdAt,
      updatedAt: new Date(),
      deletedAt: null,
      isActive: true,
    };
  }
}
