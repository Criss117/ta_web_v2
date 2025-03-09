import type { ClientFormDto, ClientPrimitive } from "@clients/domain/types";

export class ClientsMapper {
	static prepareToCreate(client: ClientFormDto): Omit<ClientPrimitive, "id"> {
		return {
			identifier: client.identifier,
			balance: 0,
			creditLimit: client.creditLimit,
			address: client.address || "",
			phone: client.phone || "",
			fullName: client.fullName,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			isActive: true,
		};
	}

	static prepareToUpdate(
		oldData: ClientPrimitive,
		newData: ClientFormDto,
	): ClientPrimitive {
		return {
			id: oldData.id,
			balance: oldData.balance,
			creditLimit: newData.creditLimit || oldData.creditLimit,
			address: newData.address || oldData.address,
			phone: newData.phone || oldData.phone,
			fullName: newData.fullName || oldData.fullName,
			deletedAt: null,
			isActive: true,
			identifier: newData.identifier || oldData.identifier,
			createdAt: oldData.createdAt,
			updatedAt: new Date(),
		};
	}
}
