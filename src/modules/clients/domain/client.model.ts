import type { Table } from "dexie";
import { Model } from "@shared/repositories";
import type { Paginable } from "@shared/models/types";
import type { ClientPrimitive } from "./types";

export class ClientModel extends Model<ClientPrimitive> {
	static instance: ClientModel;

	private constructor(table: Table<ClientPrimitive>) {
		super(table);
	}

	static init(table: Table<ClientPrimitive>) {
		ClientModel.instance = new ClientModel(table);
	}

	static getInstance() {
		if (!ClientModel.instance) {
			throw new Error("ClientModel no inicializado");
		}
		return ClientModel.instance;
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
		query: string,
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
		size: number,
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
