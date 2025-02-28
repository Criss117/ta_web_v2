import { CreateProductUseCase } from "@products/application/usecases/create-product.usecase";
import { GetAllProductsUseCase } from "@products/application/usecases/get-all-products.usecase";
import { UpdateProductUseCase } from "@products/application/usecases/update-product.usecase";

import { GetOneByUseCase } from "@products/application/usecases/get-one-by.usecase";
import { DeleteProductUseCase } from "@products/application/usecases/delete-product.usecase";
import type { ProductFormDto } from "@products/domain/schemas/types";
import type { MutationResponse } from "@shared/models/types";

export function useProducts() {
  const create = async (product: ProductFormDto): Promise<MutationResponse> => {
    const createProductUseCase = CreateProductUseCase.getInstance();

    await createProductUseCase.execute(product);
    return {
      success: true,
      error: null,
    };
  };

  const edit = async (id: number, product: ProductFormDto) => {
    const updateProductUseCase = UpdateProductUseCase.getInstance();

    await updateProductUseCase.execute(id, product);

    return {
      success: true,
      error: null,
    };
  };

  const getMany = async (page: number, size: number, query?: string) => {
    const getAllProductsUseCase = GetAllProductsUseCase.getInstance();

    return await getAllProductsUseCase.execute(page, size, query);
  };

  const getOneByBarcode = async (barcode: string) => {
    const getOneByUseCase = GetOneByUseCase.getInstance();

    return await getOneByUseCase.barcode(barcode);
  };

  const deleteProduct = async (id: number) => {
    const deleteProductUseCase = DeleteProductUseCase.getInstance();

    await deleteProductUseCase.execute(id);

    return {
      success: true,
      error: null,
    };
  };

  return {
    edit,
    create,
    getMany,
    deleteProduct,
    getOneByBarcode,
  };
}
