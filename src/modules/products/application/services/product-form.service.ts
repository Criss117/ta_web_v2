import { z } from "zod";
import type { ProductFormDto } from "@products/domain/schemas/types";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.message";
import { ProductFormSchema } from "@products/domain/schemas/product.schema";

type ClientError = {
  error: boolean;
  message: string;
  field: keyof ProductFormDto;
};

export class ProductFormService {
  static validateStock(
    stock: number,
    minStock: number
  ): ClientError | undefined {
    if (minStock >= stock) {
      return {
        error: true,
        message: PRODUCT_FORM_MESSAGES.MINSTOCK.MAX_STOCK,
        field: "minStock",
      };
    }
  }

  static validateCostPrice(
    costPrice: number,
    salePrice: number
  ): ClientError | undefined {
    if (salePrice < costPrice) {
      return {
        error: true,
        message: PRODUCT_FORM_MESSAGES.SALEPRICE.MIN_COSTPRICE,
        field: "salePrice",
      };
    }
  }

  static validateWholesalePrice(
    wholesalePrice: number,
    salePrice: number
  ): ClientError | undefined {
    if (wholesalePrice > salePrice) {
      return {
        error: true,
        message: PRODUCT_FORM_MESSAGES.WHOLESALEPRICE.MAX_COSTPRICE,
        field: "wholesalePrice",
      };
    }
  }

  static validate(product: z.infer<typeof ProductFormSchema>) {
    const error: ClientError[] = [];

    const stockError = this.validateStock(product.stock, product.minStock);

    const costPriceError = this.validateCostPrice(
      product.costPrice,
      product.salePrice
    );

    const wholesalePriceError = this.validateWholesalePrice(
      product.wholesalePrice,
      product.salePrice
    );

    if (stockError) error.push(stockError);

    if (costPriceError) error.push(costPriceError);

    if (wholesalePriceError) error.push(wholesalePriceError);

    return error;
  }
}
