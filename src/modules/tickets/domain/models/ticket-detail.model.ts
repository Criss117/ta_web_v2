import { z } from "zod";
import { DB, Model } from "@shared/repositories";

export const TicketDetailModelSchema = z.object({
  id: z.number().int(),
  ticketId: z.number(),
  barcode: z.string(),
  description: z.string(),
  amount: z.number().int(),
  price: z.number().int(),
  subTotal: z.number().int(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});

export type TicketDetailPrimitive = z.infer<typeof TicketDetailModelSchema>;

export class TicketDetailModel extends Model<TicketDetailPrimitive> {
  static instance: TicketDetailModel;

  constructor() {
    const model = DB.createModel(
      "ticket_details",
      TicketDetailModelSchema.shape
    );
    super(model);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new TicketDetailModel();
    }
    return this.instance;
  }
}
