/* eslint-disable @typescript-eslint/no-explicit-any */
import Dexie, { Table } from "dexie";

const DB_NAME = "ta_web_v2";

interface Model {
  name: string;
  schema: any;
  init: (table: Table<any>) => void;
}

class IndexedDB extends Dexie {
  private isReady: boolean = false;

  constructor() {
    super(DB_NAME);
  }

  public initializeDB(models: Model[]) {
    if (this.isReady) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    }

    const modelsToCreate = models
      .map((model) => ({
        ...model,
        schema: this.createSchema(model.schema),
      }))
      .reduce(
        (acc, model) => {
          acc[model.name] = model.schema;
          return acc;
        },
        {} as Record<string, string>
      );

    this.version(1).stores(modelsToCreate);

    models.forEach((model) => {
      model.init(this.table(model.name));
    });

    this.isReady = true;
  }

  public createSchema(schemaObject: Record<string, unknown>) {
    return Object.keys(schemaObject)
      .map((key) => (key === "id" ? "id++" : key))
      .join(", ");
  }
}

export const DB = new IndexedDB();
