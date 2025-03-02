import { productFactory } from "@products/infrastructure/factories/product.factory";
import { clientFactory } from "@clients/infrastructure/factories/client.factory";
import { ticketFactory } from "@tickets/infrastructure/factories/ticket.factory";
import { ticketDetailsFactory } from "@tickets/infrastructure/factories/ticket-details.factory";
import type { FactoryState } from "../models/types";

export const factories: FactoryState[] = [
  {
    name: "ProductsFactory",
    execute: productFactory.execute,
  },
  {
    name: "ClientsFactory",
    execute: clientFactory.execute,
  },
  {
    name: "TicketsFactory",
    execute: ticketFactory.execute,
  },
  {
    name: "TicketDetailsFactory",
    execute: ticketDetailsFactory.execute,
  },
];
