import { z } from "zod";
import { DB, Model } from "@shared/repositories";
import type { Paginable } from "@shared/models/types";

export const ClientModelSchema = z.object({
  id: z.number(),
  identifier: z.string(),
  fullName: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
  creditLimit: z.number(),
  balance: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().default(true),
});

export type ClientPrimitive = z.infer<typeof ClientModelSchema>;

export class ClientModel extends Model<ClientPrimitive> {
  static instance: ClientModel;

  constructor() {
    const model = DB.createModel("clients", ClientModelSchema.shape);
    super(model);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ClientModel();
    }
    return this.instance;
  }

  private compareQuery(product: ClientPrimitive, query: string): boolean {
    if (!product.isActive) return false;

    const isFullName = product.fullName
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    if (isFullName) {
      return true;
    }

    const isIdentifier = product.identifier
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    if (isIdentifier) {
      return true;
    }

    return false;
  }

  public async getPaginatedAndQuery(
    page: number,
    size: number,
    query: string
  ): Promise<Paginable<ClientPrimitive>> {
    const table = await this.useTable();

    const filtered = table
      .filter((p) => {
        return this.compareQuery(p, query);
      })
      .reverse()
      .offset(page * size)
      .limit(size);

    const clientsPromise = filtered.toArray();
    const countPromise = filtered.count();

    const res = await Promise.all([clientsPromise, countPromise]);

    const [clients, count] = res;

    return {
      items: clients,
      count: {
        totalItems: count,
        totalPage: Math.ceil(count / size),
      },
    };
  }

  public async getPaginated(
    page: number,
    size: number
  ): Promise<Paginable<ClientPrimitive>> {
    const table = await this.useTable();

    const items = table
      .filter((p) => p.isActive === true)
      .reverse()
      .offset(page * size)
      .limit(size)
      .toArray();

    const count = table.count();

    const res = await Promise.all([items, count]);

    return {
      items: res[0],
      count: {
        totalItems: res[1],
        totalPage: Math.ceil(res[1] / size),
      },
    };
  }
}
