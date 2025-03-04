import type { TicketPrimitive } from "@tickets/domain/types";

export class TicketsMapper {
  static prepareToCreate(
    total: number,
    clientId: number | null
  ): Omit<TicketPrimitive, "id"> {
    return {
      clientId: clientId,
      total: total,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isActive: true,
    };
  }
}
