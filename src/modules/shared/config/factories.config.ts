import { productFactory } from "@products/infrastructure/factories/product.factory";
import type { FactoryState } from "../models/types";

export const factories: FactoryState[] = [
  {
    name: "ProductsFactory",
    execute: productFactory.execute,
  },
];
