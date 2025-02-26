import type { Table, UpdateSpec } from "dexie";

// Clase base genérica para modelos
export class Model<T, K = number> {
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

  async getById(id: K): Promise<T | undefined> {
    return this.table.get(id);
  }

  async getByField(
    field: keyof T,
    value: string | number
  ): Promise<T | undefined> {
    return this.table.get({ [field]: value });
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

    return this.table.get(id);
  }

  async count() {
    return this.table.count();
  }

  async softDelete(
    id: K,
    someChanges?: (data: NonNullable<Awaited<T>>) => NonNullable<Awaited<T>>
  ) {
    const data = await this.table.get(id);

    if (!data) {
      throw new Error("El dato no existe");
    }

    const updatedData = someChanges ? someChanges(data) : data;

    return this.table.update(id, updatedData);
  }
}
