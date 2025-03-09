import type { TicketPrimitive, TicketYear } from "@tickets/domain/types";

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

  static domainToTicketYear(tickets: TicketPrimitive[]): TicketYear {
    return tickets.reduce((acc: TicketYear, ticket) => {
      if (!ticket.createdAt) return acc;

      const data = new Date(ticket.createdAt);
      const year = data.getFullYear();
      const month = data.getMonth();

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      acc[year][month].push({
        id: ticket.id,
        day: data.getUTCDate(),
        dayId: data.getUTCDay(),
        total: ticket.total,
      });

      return acc;
    }, {});
  }
}
