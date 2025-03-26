import { z } from "zod";
import { DebtPaymentSchema } from "./debt-payment.schema";

export const DebtPaymentFormSchema = DebtPaymentSchema.pick({
	amount: true,
	clientId: true,
}).extend({
	clientId: z.number(),
	amount: z.preprocess(
		(value) => Number(value) || 0,
		z
			.number({
				required_error: "Debe ingresar un valor",
			})
			.min(1, { message: "El valor debe ser mayor a 0" }),
	),
});
