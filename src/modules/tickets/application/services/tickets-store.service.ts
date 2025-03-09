import { validateStock } from "@/lib/utils";
import type {
	TicketDetailStore,
	TicketState,
} from "@/modules/tickets/domain/types";

export class TicketsStoreService {
	static mutateDetail(
		tickets: TicketState[],
		temporaryId: string,
		callback: (detail: TicketDetailStore[]) => TicketDetailStore[],
	) {
		const newTickets = tickets.map((ticket) => {
			if (ticket.temporaryId !== temporaryId) {
				return ticket;
			}

			return {
				...ticket,
				detail: callback(ticket.detail),
			};
		});
		return newTickets;
	}

	static mutateTickets(
		tickets: TicketState[],
		temporaryId: string,
		callback: (ticket: TicketState) => TicketState,
	) {
		const newTickets = tickets.map((ticket) => {
			if (ticket.temporaryId !== temporaryId) {
				return ticket;
			}

			return callback(ticket);
		});
		return newTickets;
	}

	static createTicket(tickets: TicketState[]) {
		const lastTicketNumber = tickets[tickets.length - 1].ticketNumber;

		const newTicket: TicketState = {
			temporaryId: crypto.randomUUID(),
			ticketName: null,
			ticketNumber: lastTicketNumber + 1,
			detail: [],
		};
		const newTickets = [...tickets, newTicket];

		return {
			tickets: newTickets,
			selectedTicketId: newTicket.temporaryId,
		};
	}

	static deleteTicket(
		tickets: TicketState[],
		temporaryId: string,
		selectedTicketId: string,
	) {
		const isLastTicket = tickets.length === 1;

		if (isLastTicket) {
			return TicketsStoreService.createTicket([]);
		}

		const newTickets = tickets.filter((ticket) => {
			return ticket.temporaryId !== temporaryId;
		});

		const newSelectedTicketId =
			selectedTicketId === temporaryId
				? newTickets.at(-1)?.temporaryId
				: selectedTicketId;

		return {
			tickets: newTickets,
			selectedTicketId: newSelectedTicketId,
		};
	}

	static clearTicket(tickets: TicketState[], temporaryId: string) {
		return TicketsStoreService.mutateTickets(tickets, temporaryId, (ticket) => {
			return {
				...ticket,
				detail: [],
			};
		});
	}

	static changeTicketName(
		tickets: TicketState[],
		temporaryId: string,
		name: string,
	) {
		return TicketsStoreService.mutateTickets(tickets, temporaryId, (ticket) => {
			return {
				...ticket,
				ticketName: name,
			};
		});
	}

	static addTicketDetail(
		tickets: TicketState[],
		temporaryId: string,
		newDetail: TicketDetailStore,
	) {
		return TicketsStoreService.mutateTickets(tickets, temporaryId, (ticket) => {
			if (ticket.detail.some((t) => t.barcode === newDetail.barcode)) {
				const newDetails = ticket.detail.map((t) => {
					if (t.barcode === newDetail.barcode) {
						const newStock = validateStock({
							newQuantity: t.quantity + 1,
							currentStock: t.currentStock,
							totalStock: t.stock,
						});

						return {
							...t,
							quantity: newStock.quantity,
							currentStock: newStock.currentStock,
							subTotal: newDetail.salePrice * newStock.quantity,
						};
					}

					return t;
				});

				return {
					...ticket,
					detail: newDetails,
				};
			}

			newDetail.currentStock = newDetail.stock - 1;

			return {
				...ticket,
				detail: [...ticket.detail, newDetail],
			};
		});
	}

	static changeSalePriceOrQuantity(info: {
		tickets: TicketState[];
		temporaryId: string;
		barcode: string;
		newSalePrice: number;
		newQuantity: number;
	}) {
		const { tickets, temporaryId, barcode, newSalePrice, newQuantity } = info;

		const newTickets = TicketsStoreService.mutateDetail(
			tickets,
			temporaryId,
			(detail) => {
				return detail.map((t) => {
					if (t.barcode === barcode) {
						const newStock = validateStock({
							newQuantity: newQuantity,
							currentStock: t.currentStock,
							totalStock: t.stock,
						});

						return {
							...t,
							salePrice: newSalePrice,
							quantity: newStock.quantity,
							currentStock: newStock.currentStock,
							subTotal: newSalePrice * newStock.quantity,
						};
					}

					return t;
				});
			},
		);

		return newTickets;
	}

	static deleteDetail(
		tickets: TicketState[],
		temporaryId: string,
		barcode: string,
	) {
		const newTickets = TicketsStoreService.mutateTickets(
			tickets,
			temporaryId,
			(ticket) => {
				return {
					...ticket,
					detail: ticket.detail.filter((detail) => detail.barcode !== barcode),
				};
			},
		);

		return newTickets;
	}
}
