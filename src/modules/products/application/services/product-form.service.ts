import type { z } from "zod";
import { PRODUCT_FORM_MESSAGES } from "@/lib/messages/product.message";
import type { ProductFormDto } from "@/modules/products/domain/types";
import type { ProductFormSchema } from "@/modules/products/domain/product-form.schema";

type ClientError = {
	error: boolean;
	message: string;
	field: keyof ProductFormDto;
};

export class ProductFormService {
	static validateStock(
		stock: number,
		minStock: number,
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
		salePrice: number,
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
		salePrice: number,
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

		const stockError = ProductFormService.validateStock(
			product.stock,
			product.minStock,
		);

		const costPriceError = ProductFormService.validateCostPrice(
			product.costPrice,
			product.salePrice,
		);

		const wholesalePriceError = ProductFormService.validateWholesalePrice(
			product.wholesalePrice,
			product.salePrice,
		);

		if (stockError) error.push(stockError);

		if (costPriceError) error.push(costPriceError);

		if (wholesalePriceError) error.push(wholesalePriceError);

		return error;
	}
}
