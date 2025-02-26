import { z } from "zod";
import { DB, Model } from "@shared/repositories";
import { Paginable } from "@shared/models/types";

export const ProductModelSchema = z.object({
  id: z.number().optional(),
  barcode: z.string(),
  description: z.string(),
  costPrice: z.number(),
  salePrice: z.number(),
  wholesalePrice: z.number(),
  stock: z.number(),
  minStock: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable(),
  isActive: z.boolean().optional(),
});

export type ProductPrimitive = z.infer<typeof ProductModelSchema>;

export class ProductModel extends Model<ProductPrimitive> {
  static instance: ProductModel;

  constructor() {
    const model = DB.createModel("products", ProductModelSchema.shape);
    super(model);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductModel();
    }
    return this.instance;
  }

  private compareQuery(product: ProductPrimitive, query: string): boolean {
    if (!product.isActive) return false;

    const isDescription = product.description
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    if (isDescription) {
      return true;
    }

    const isBarcode = product.barcode
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    if (isBarcode) {
      return true;
    }

    return false;
  }

  public async getPaginatedAndQuery(
    page: number,
    size: number,
    query: string
  ): Promise<Paginable<ProductPrimitive>> {
    const table = await this.useTable();

    const filtered = table
      .filter((p) => {
        return this.compareQuery(p, query);
      })
      .reverse()
      .offset(page * size)
      .limit(size);

    const productsPromise = filtered.toArray();
    const countPromise = filtered.count();

    const res = await Promise.all([productsPromise, countPromise]);

    const [products, count] = res;

    return {
      items: products,
      count: {
        totalItems: count,
        totalPage: Math.ceil(count / size),
      },
    };
  }

  async getPaginated(
    page: number,
    size: number
  ): Promise<Paginable<ProductPrimitive>> {
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
