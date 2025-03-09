import type { z } from "zod";
import type { ClientModelSchema } from "./client.schema";
import type { ClientFormSchema } from "./client-form.schema";

export type ClientFormDto = z.infer<typeof ClientFormSchema>;
export type ClientPrimitive = z.infer<typeof ClientModelSchema>;
