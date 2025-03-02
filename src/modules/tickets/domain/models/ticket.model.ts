import { z } from "zod";
import { DB, Model } from "@shared/repositories";

export const TicketModelSchema = z.object({
  id: z.number(),
  clientId: z.number().nullable(),
  total: z.number(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});

export type TicketPrimitive = z.infer<typeof TicketModelSchema>;

export class TicketModel extends Model<TicketPrimitive> {
  static instance: TicketModel;

  constructor() {
    const model = DB.createModel("tickets", TicketModelSchema.shape);
    super(model);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new TicketModel();
    }
    return this.instance;
  }
}
