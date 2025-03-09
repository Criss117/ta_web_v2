import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import type { ClientFormDto } from "@clients/domain/types";

export class CreateClientUseCase {
	static instance: CreateClientUseCase;

	private constructor(private readonly clientRepository: ClientRepository) {}

	public static getInstance() {
		if (!CreateClientUseCase.instance) {
			CreateClientUseCase.instance = new CreateClientUseCase(
				ClientRepository.getInstance(),
			);
		}
		return CreateClientUseCase.instance;
	}

	public async execute(client: ClientFormDto) {
		return await this.clientRepository.create(client);
	}
}
