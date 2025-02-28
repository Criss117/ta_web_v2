import { z } from "zod";
import { ClientFormSchema } from "./client.schema";

export type ClientFormDto = z.infer<typeof ClientFormSchema>;
