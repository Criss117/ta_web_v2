import { z } from "zod";
import { ClientModelSchema } from "./client.schema";
import { ClientFormSchema } from "./client-form.schema";

export type ClientFormDto = z.infer<typeof ClientFormSchema>;
export type ClientPrimitive = z.infer<typeof ClientModelSchema>;
