import { ClientsMapper } from "@clients/infrastructure/mappers/clients.mapper";
import { ClientModel } from "@clients/domain/client.model";
import type { ClientFormDto, ClientPrimitive } from "@clients/domain/types";
import type { Paginable } from "@shared/models/types";

export class ClientRepository {
	static instance: ClientRepository;

	constructor(private readonly clientModel: ClientModel) {}

	public static getInstance() {
		if (!ClientRepository.instance) {
			ClientRepository.instance = new ClientRepository(
				ClientModel.getInstance(),
			);
		}
		return ClientRepository.instance;
	}

	public async getByIdentifier(identifier: string) {
		return this.clientModel.getByField("identifier", identifier);
	}

	public async get(id: number) {
		return this.clientModel.getById(id);
	}

	public async getPaginated(
		page: number,
		size: number,
		query?: string,
	): Promise<Paginable<ClientPrimitive>> {
		if (query) {
			return this.clientModel.getPaginatedAndQuery(page, size, query);
		}

		return this.clientModel.getPaginated(page, size);
	}

	public async create(client: ClientFormDto) {
		const existingClient = await this.clientModel.getByField(
			"identifier",
			client.identifier,
		);

		if (existingClient) {
			throw new Error("El cliente ya existe");
		}

		return this.clientModel.add(ClientsMapper.prepareToCreate(client));
	}

	public async updateBalance(id: number, balance: number) {
		const existingClient = await this.clientModel.getByField("id", id);

		if (!existingClient) {
			throw new Error("El cliente no existe");
		}

		await this.clientModel.update(id, {
			...existingClient,
			balance,
		});
	}

	public async edit(id: number, client: ClientFormDto) {
		const existingClient = await this.clientModel.getByField("id", id);

		if (!existingClient) {
			throw new Error("El producto no existe");
		}

		if (client.identifier !== existingClient.identifier) {
			const existingIdentifier = await this.clientModel.getByField(
				"identifier",
				client.identifier,
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

	public async settleDebt(clientdId: number) {
		await this.clientModel.update(clientdId, {
			balance: 0,
		});
	}
}
