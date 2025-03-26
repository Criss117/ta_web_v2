import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import type { MutationResponse } from "@shared/models/types";
import type { ClientFormDto, ClientPrimitive } from "@clients/domain/types";
import { ClientFormSchema } from "@clients/domain/client-form.schema";

export function useClientForm(client?: ClientPrimitive) {
	const [responseStatus, setResponseStatus] = useState<MutationResponse | null>(
		null,
	);

	const nav = useNavigate();

	const form = useForm<ClientFormDto>({
		resolver: zodResolver(ClientFormSchema),
		defaultValues: client && { ...client },
	});

	const onSubmit = async (
		data: ClientFormDto,
		mutationFn: (client: ClientFormDto) => Promise<MutationResponse>,
	) => {
		form.clearErrors();

		await mutationFn(data)
			.then((res) => {
				form.reset();
				setResponseStatus(res);
				nav({
					to: "/dashboard/clients",
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
