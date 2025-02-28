import { z } from "zod";
import { ProductFormSchema } from "./product.schema";

export type ProductFormDto = z.infer<typeof ProductFormSchema>;
