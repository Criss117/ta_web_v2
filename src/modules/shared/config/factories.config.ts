import { productFactory } from "@products/infrastructure/factories/product.factory";
import { clientFactory } from "@clients/infrastructure/factories/client.factory";
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
];
