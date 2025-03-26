import type { z } from "zod";
import type { DebtPaymentSchema } from "./debt-payment.schema";

export type DebtPaymentPrimitive = z.infer<typeof DebtPaymentSchema>;
