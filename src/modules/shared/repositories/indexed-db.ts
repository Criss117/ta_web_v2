import Dexie from "dexie";
import { Models } from "../enum/models.enum";

const DB_NAME = "ta_web_v2";

export type NameModels = (typeof Models)[keyof typeof Models] | "sync";

class IndexedDB extends Dexie {
  private models: Partial<Record<NameModels, Dexie.Table>> = {};

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      sync: "++id, tableName, state, error, lastSync, recordId, operation",
    });
    this.models = {
      sync: this.table("sync"),
    };
  }

  public getModel<T>(tableName: NameModels): Dexie.Table<T, number> {
    if (!this.models || !this.models[tableName]) {
      throw new Error("Models not initialized");
    }
    return this.models[tableName];
  }

  public createModel(
    tableName: NameModels,
    schemaObject: Record<string, unknown>
  ) {
    if (this.models && this.models[tableName]) {
      throw new Error(`Model ${tableName} already exists`);
    }
    const schema = Object.keys(schemaObject)
      .map((key) => (key === "id" ? "id++" : key))
      .join(", ");

    this.version(1).stores({ [tableName]: schema });

    this.models[tableName] = this.table(tableName);

    return this.models[tableName];
  }
}

export const DB = new IndexedDB();
