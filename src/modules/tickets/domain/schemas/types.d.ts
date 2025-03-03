import type { TicketDetailPrimitive } from "../models/ticket-detail.model";
import type { TicketPrimitive } from "../models/ticket.model";

export interface TicketDetailStore
  extends Pick<
    TicketDetailPrimitive,
    "barcode" | "description" | "quantity" | "salePrice" | "subTotal"
  > {
  wholeSalePrice: number;
  currentStock: number;
  stock: number;
}

export interface TicketState
  extends Pick<TicketPrimitive, "total" | "clientId"> {
  temporaryId: string;
  ticketNumber: number;
  ticketName: string | null;
  detail: TicketDetailStore[];
}
