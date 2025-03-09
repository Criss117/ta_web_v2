import type {
	TicketDetailPrimitive,
	TicketDetailStore,
} from "@/modules/tickets/domain/types";

export class TicketDetailMapper {
	static prepareToCreate(
		ticketDetail: TicketDetailStore,
		ticketId: number,
	): Omit<TicketDetailPrimitive, "id"> {
		return {
			ticketId: ticketId,
			barcode: ticketDetail.barcode,
			description: ticketDetail.description,
			quantity: ticketDetail.quantity,
			salePrice: ticketDetail.salePrice,
			subTotal: ticketDetail.subTotal,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			isActive: true,
		};
	}

	static prepareManyToCreate(
		ticketDetail: TicketDetailStore[],
		ticketId: number,
	) {
		return ticketDetail.map((detail) =>
			TicketDetailMapper.prepareToCreate(detail, ticketId),
		);
	}
}
