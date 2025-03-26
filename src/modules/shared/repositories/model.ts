import type { Table, UpdateSpec } from "dexie";
import type { Paginable } from "../models/types";

// Clase base genérica para modelos
export abstract class Model<T, K = number> {
	private table: Table<T, K>;

	constructor(table: Table<T, K>) {
		this.table = table;
	}

	async useTable() {
		return this.table;
	}

	async add(data: Omit<T, "id">): Promise<K> {
		return this.table.add(data as T);
	}

	async put(data: Omit<T, "id">): Promise<K> {
		return this.table.put(data as T);
	}

	async getById(id: K): Promise<T | undefined> {
		return this.table.get(id);
	}

	async getByField(
		field: keyof T,
		value: string | number,
	): Promise<T | undefined> {
		const model = await this.table.get({ [field]: value });

		return model ? model : undefined;
	}

	async getManyByField(field: keyof T, value: string | number) {
		const model = await this.table.where({ [field]: value }).toArray();

		return model;
	}

	async getAll(): Promise<T[]> {
		return this.table.toArray();
	}

	async delete(id: K): Promise<void> {
		await this.table.delete(id);
	}

	async update(id: K, data: UpdateSpec<T>) {
		const updated = await this.table.update(id, data);

		if (!updated) {
			throw new Error("No se ha actualizado");
		}

		return updated;
	}

	async count() {
		return this.table.count();
	}

	async softDelete(
		id: K,
		someChanges?: (data: NonNullable<Awaited<T>>) => NonNullable<Awaited<T>>,
	) {
		const data = await this.table.get(id);

		if (!data) {
			throw new Error("El dato no existe");
		}

		const updatedData = someChanges ? someChanges(data) : data;

		return this.table.update(id, updatedData);
	}

	async getPaginated(page: number, size: number): Promise<Paginable<T>> {
		const countPromise = this.count();
		const itemsPromise = this.table
			.offset(page * size)
			.limit(size)
			.toArray();

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		return {
			items,
			count: {
				totalItems: count,
				totalPage: Math.ceil(count / size),
			},
		};
	}

	async getPaginatedAndQuery(
		page: number,
		size: number,
		query: string,
	): Promise<Paginable<T>> {
		console.log(query);

		return this.getPaginated(page, size);
	}

	async bulkAdd(data: Omit<T, "id">[]) {
		return this.table.bulkAdd(data as T[]);
	}

	async deletMany(ids: K[]) {
		return this.table.bulkDelete(ids);
	}

	async deleteManyByField(field: keyof T, value: string | number) {
		return this.table.where({ [field]: value }).delete();
	}
}
