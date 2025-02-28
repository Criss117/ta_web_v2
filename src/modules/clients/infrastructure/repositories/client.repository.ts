import { Paginable } from "@shared/models/types";
import {
  ClientModel,
  type ClientPrimitive,
} from "@clients/domain/client.model";
import { ClientsMapper } from "@clients/infrastructure/mappers/clients.mapper";
import type { ClientFormDto } from "@clients/domain/schemas/types";

export class ClientRepository {
  static instance: ClientRepository;

  constructor(private readonly clientModel: ClientModel) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ClientRepository(ClientModel.getInstance());
    }
    return this.instance;
  }

  public async getByIdentifier(identifier: string) {
    return this.clientModel.getByField("identifier", identifier);
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

  public async create(client: ClientFormDto) {
    const existingClient = await this.clientModel.getByField(
      "identifier",
      client.identifier
    );

    if (existingClient) {
      throw new Error("El cliente ya existe");
    }

    return this.clientModel.add(ClientsMapper.prepareToCreate(client));
  }

  public async edit(id: number, client: ClientFormDto) {
    const existingClient = await this.clientModel.getByField("id", id);

    if (!existingClient) {
      throw new Error("El producto no existe");
    }

    if (client.identifier !== existingClient.identifier) {
      const existingIdentifier = await this.clientModel.getByField(
        "identifier",
        client.identifier
      );

      if (existingIdentifier) {
        throw new Error("El codigo de identificacion ya está registrado");
      }
    }

    const updatedClient = ClientsMapper.prepareToUpdate(existingClient, client);

    await this.clientModel.update(id, updatedClient);

    return updatedClient;
  }

  public delete(id: number) {
    return this.clientModel.softDelete(id, (client) => {
      client.deletedAt = new Date();
      client.isActive = false;
      return client;
    });
  }
}
