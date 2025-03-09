import type { TicketDetailModelSchema } from "./ticket-detail.schema";
import type { TicketModelSchema } from "./ticket.schema";

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

export type TicketYear = {
	[x: number]: Record<number, TicketList[]>;
};

export type TicketMonth = {
	[x: number]: TicketList[];
};

export type TicketList = {
	id: number;
	total: number;
	day: number;
	dayId: number;
	detail?: TicketDetailPrimitive[];
};
