import { Paginable } from "@shared/models/types";
import {
  ClientModel,
  type ClientPrimitive,
} from "@clients/domain/client.model";

export class ClientRepository {
  static instance: ClientRepository;

  constructor(private readonly clientModel: ClientModel) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ClientRepository(ClientModel.getInstance());
    }
    return this.instance;
  }

  public async getPaginated(
    page: number,
    size: number,
    query?: string
  ): Promise<Paginable<ClientPrimitive>> {
    if (query) {
      return this.clientModel.getPaginatedAndQuery(page, size, query);
    }

    return this.clientModel.getPaginated(page, size);
  }
}
