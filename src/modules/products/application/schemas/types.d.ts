import { z } from "zod";
import { EditProductFormSchema, ProductFormSchema } from "./product.schema";

export type ProductFormDto = z.infer<typeof ProductFormSchema> & {
  id?: number;
};

export type EditProductDto = z.infer<typeof EditProductFormSchema>;

export type MutationResponse = {
  success: boolean;
  error: string | null;
};
