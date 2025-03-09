import { CreateClientUseCase } from "@clients/application/usecases/create-client.usecase";
import { DeleteClientUseCase } from "@clients/application/usecases/delete-client.usecase";
import { UpdateClientUseCase } from "@clients/application/usecases/update-client.usecase";
import { GetManyClientsUseCase } from "@clients/application/usecases/get-many-clients.usecase";
import { GetOneClientByUseCase } from "@clients/application/usecases/get-one-client-by.usecase";
import type { ClientFormDto } from "@clients/domain/types";
import type { MutationResponse } from "@shared/models/types";

export function useClients() {
	const create = async (client: ClientFormDto): Promise<MutationResponse> => {
		const createClient = CreateClientUseCase.getInstance();

		await createClient.execute(client);

		return {
			success: true,
			error: null,
		};
	};

	const getMany = async (page: number, size: number, query?: string) => {
		const getManyClients = GetManyClientsUseCase.getInstance();

		return await getManyClients.execute(page, size, query);
	};

	const edit = async (id: number, client: ClientFormDto) => {
		const updateClientUseCase = UpdateClientUseCase.getInstance();

		await updateClientUseCase.execute(id, client);

		return {
			success: true,
			error: null,
		};
	};

	const getByidentifier = (identifier: string) => {
		const getOneByUseCase = GetOneClientByUseCase.getInstance();

		return getOneByUseCase.identifier(identifier);
	};

	const deleteProduct = async (id: number) => {
		const deleteClientUseCase = DeleteClientUseCase.getInstance();

		await deleteClientUseCase.execute(id);

		return {
			success: true,
			error: null,
		};
	};

	return {
		create,
		edit,
		getMany,
		deleteProduct,
		getByidentifier,
	};
}
