import { TicketDetailModel } from "@tickets/domain/ticket-detail.model";
import type { TicketDetailPrimitive } from "@tickets/domain/types";

export class TicketDetailRepository {
  static instance: TicketDetailRepository;

  constructor(private readonly ticketDetailModel: TicketDetailModel) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TicketDetailRepository(
        TicketDetailModel.getInstance()
      );
    }
    return this.instance;
  }

  public createMany(ticketDetails: Omit<TicketDetailPrimitive, "id">[]) {
    return this.ticketDetailModel.bulkAdd(ticketDetails);
  }
}
