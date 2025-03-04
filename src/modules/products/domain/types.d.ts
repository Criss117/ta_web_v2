import { z } from "zod";
import { ProductFormSchema } from "./product-form.schema";
import { ProductModelSchema } from "./product.schema";

export type ProductFormDto = z.infer<typeof ProductFormSchema>;
export type ProductPrimitive = z.infer<typeof ProductModelSchema>;
