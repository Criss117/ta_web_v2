import type { z } from "zod";
import type { ProductFormSchema } from "./product-form.schema";
import type { ProductModelSchema } from "./product.schema";

export type ProductFormDto = z.infer<typeof ProductFormSchema>;
export type ProductPrimitive = z.infer<typeof ProductModelSchema>;
