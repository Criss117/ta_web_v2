import { ClientModel } from "@clients/domain/client.model";
import { ClientModelSchema } from "@clients/domain/client.schema";
import { ProductModel } from "@products/domain/product.model";
import { ProductModelSchema } from "@products/domain/product.schema";
import { TicketDetailModel } from "@tickets/domain/ticket-detail.model";
import { TicketDetailModelSchema } from "@tickets/domain/ticket-detail.schema";
import { TicketModel } from "@tickets/domain/ticket.model";
import { TicketModelSchema } from "@tickets/domain/ticket.schema";

export const Models = [
  {
    name: "clients",
    schema: ClientModelSchema.shape,
    init: ClientModel.init,
  },
  {
    name: "products",
    schema: ProductModelSchema.shape,
    init: ProductModel.init,
  },
  {
    name: "tickets",
    schema: TicketModelSchema.shape,
    init: TicketModel.init,
  },
  {
    name: "ticket_details",
    schema: TicketDetailModelSchema.shape,
    init: TicketDetailModel.init,
  },
];
