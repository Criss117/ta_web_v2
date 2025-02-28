import { z } from "zod";
import { PaginiationSchema } from "./schemas";

export type Pagination = z.infer<typeof PaginiationSchema>;

export interface Paginable<T> {
  items: T[];
  count: {
    totalItems: number;
    totalPage: number;
  };
}

export type MutationResponse = {
  success: boolean;
  error: string | null;
};

export interface FactoryState {
  name: string;
  execute: (amount: number) => Promise<void>;
}
