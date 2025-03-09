import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class GetManyClientsUseCase {
	static instance: GetManyClientsUseCase;

	private constructor() {}

	public static getInstance() {
		if (!GetManyClientsUseCase.instance) {
			GetManyClientsUseCase.instance = new GetManyClientsUseCase();
		}
		return GetManyClientsUseCase.instance;
	}

	public async execute(page: number, size: number, query?: string) {
		const repository = ClientRepository.getInstance();

		return await repository.getPaginated(page, size, query);
	}
}
