import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import type { ClientFormDto } from "@clients/domain/types";

export class UpdateClientUseCase {
	static instance: UpdateClientUseCase;

	private constructor(private readonly clientRepository: ClientRepository) {}

	public static getInstance() {
		if (!UpdateClientUseCase.instance) {
			UpdateClientUseCase.instance = new UpdateClientUseCase(
				ClientRepository.getInstance(),
			);
		}
		return UpdateClientUseCase.instance;
	}

	public async execute(id: number, client: ClientFormDto) {
		return await this.clientRepository.edit(id, client);
	}
}
