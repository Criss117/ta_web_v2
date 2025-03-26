import { z } from "zod";

export const DebtPaymentSchema = z.object({
	id: z.number(),
	amount: z.number(),
	lastBalance: z.number(),
	clientId: z.number(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
	deletedAt: z.date().nullable(),
	isActive: z.boolean().default(true),
});
