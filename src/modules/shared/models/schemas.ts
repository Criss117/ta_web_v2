import { z } from "zod";

export const PageSchema = z.number().min(1).int();
export const LimitSchema = z.union([
  z.literal(20),
  z.literal(30),
  z.literal(50),
]);
export const QuerySchema = z.string().optional();

export const PaginiationSchema = z.object({
  page: PageSchema,
  size: LimitSchema,
  query: QuerySchema,
});
