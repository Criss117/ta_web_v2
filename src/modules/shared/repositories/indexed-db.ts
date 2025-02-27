import Dexie from "dexie";
import { Models } from "../config/models.config";

const DB_NAME = "ta_web_v2";

export type NameModels = (typeof Models)[keyof typeof Models] | "sync";

class IndexedDB extends Dexie {
  static version = 1;
  private models: Partial<Record<NameModels, Dexie.Table>> = {};

  constructor() {
    super(DB_NAME);
    this.version(IndexedDB.version).stores({
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

  static incrementVersion() {
    return ++IndexedDB.version;
  }

  public createModel(
    tableName: NameModels,
    schemaObject: Record<string, unknown>
  ) {
    this.close();
    if (this.models && this.models[tableName]) {
      throw new Error(`Model ${tableName} already exists`);
    }
    const schema = Object.keys(schemaObject)
      .map((key) => (key === "id" ? "id++" : key))
      .join(", ");

    const newVersion = IndexedDB.incrementVersion();

    this.version(newVersion).stores({ [tableName]: schema });

    this.models[tableName] = this.table(tableName);

    console.info(`Model ${tableName} created`);

    this.open();

    return this.models[tableName];
  }
}

export const DB = new IndexedDB();
