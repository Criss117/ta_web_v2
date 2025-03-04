import { z } from "zod";

export const ProductModelSchema = z.object({
  id: z.number(),
  barcode: z.string(),
  description: z.string(),
  costPrice: z.number(),
  salePrice: z.number(),
  wholesalePrice: z.number(),
  stock: z.number(),
  minStock: z.number(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});
