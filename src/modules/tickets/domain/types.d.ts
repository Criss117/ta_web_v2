import type { TicketDetailPrimitive } from "./ticket-detail.model";
import { TicketDetailModelSchema } from "./ticket-detail.schema";
import { TicketModelSchema } from "./ticket.schema";

export interface TicketDetailStore
  extends Pick<
    TicketDetailPrimitive,
    "barcode" | "description" | "quantity" | "salePrice" | "subTotal"
  > {
  wholeSalePrice: number;
  currentStock: number;
  stock: number;
}

export interface TicketState {
  temporaryId: string;
  ticketNumber: number;
  ticketName: string | null;
  detail: TicketDetailStore[];
}

export type TicketPrimitive = z.infer<typeof TicketModelSchema>;
export type TicketDetailPrimitive = z.infer<typeof TicketDetailModelSchema>;
