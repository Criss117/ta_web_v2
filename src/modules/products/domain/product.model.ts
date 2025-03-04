import { Table } from "dexie";
import { Model } from "@shared/repositories";
import { Paginable } from "@shared/models/types";
import { ProductPrimitive } from "./types";

export class ProductModel extends Model<ProductPrimitive> {
  static instance: ProductModel;

  constructor(table: Table<ProductPrimitive>) {
    super(table);
  }

  static init(table: Table<ProductPrimitive>) {
    ProductModel.instance = new ProductModel(table);
  }

  static getInstance() {
    if (!this.instance) {
      throw new Error("ProductModel no inicializado");
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
