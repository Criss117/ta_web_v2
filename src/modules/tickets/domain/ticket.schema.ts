import { z } from "zod";

export const TicketModelSchema = z.object({
  id: z.number(),
  clientId: z.number().nullable(),
  total: z.number(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});
