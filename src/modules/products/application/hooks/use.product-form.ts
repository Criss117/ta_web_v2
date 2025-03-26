import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { ProductFormService } from "@products/application/services/product-form.service";

import type { MutationResponse } from "@shared/models/types";
import type {
	ProductFormDto,
	ProductPrimitive,
} from "@/modules/products/domain/types";
import { ProductFormSchema } from "@/modules/products/domain/product-form.schema";

export function useProductForm(product?: ProductPrimitive) {
	const [responseStatus, setResponseStatus] = useState<MutationResponse | null>(
		null,
	);

	const nav = useNavigate();

	const form = useForm<ProductFormDto>({
		resolver: zodResolver(ProductFormSchema),
		defaultValues: product && { ...product },
	});

	const onSubmit = async (
		data: ProductFormDto,
		mutationFn: (
			product: ProductFormDto,
			id?: number,
		) => Promise<MutationResponse>,
	) => {
		form.clearErrors();
		const errosValidations = ProductFormService.validate(data);

		if (errosValidations.length > 0) {
			errosValidations.map((error) => {
				form.setError(error.field, {
					message: error.message,
				});
			});

			return;
		}

		await mutationFn(data)
			.then((res) => {
				form.reset();
				setResponseStatus(res);
				nav({
					to: "/dashboard/products",
					search: {
						page: 1,
						size: 20,
					},
				});
			})
			.catch((err) => {
				const message =
					err.error ||
					err.message ||
					"Ocurrió un error al enviar el formulario";

				toast.error(message);
			});
	};

	return {
		form,
		responseStatus,
		isLoading: form.formState.isSubmitting,
		onSubmit,
	};
}
