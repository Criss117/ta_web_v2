import { z } from "zod";

export const ClientModelSchema = z.object({
  id: z.number(),
  identifier: z.string(),
  fullName: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
  creditLimit: z.number(),
  balance: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});
