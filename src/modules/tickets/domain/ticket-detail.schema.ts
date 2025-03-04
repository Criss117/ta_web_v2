import { z } from "zod";

export const TicketDetailModelSchema = z.object({
  id: z.number().int(),
  ticketId: z.number(),
  barcode: z.string(),
  description: z.string(),
  quantity: z.number().int(),
  salePrice: z.number().int(),
  subTotal: z.number().int(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});
