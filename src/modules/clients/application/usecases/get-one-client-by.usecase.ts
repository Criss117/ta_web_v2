import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class GetOneClientByUseCase {
	static instance: GetOneClientByUseCase;

	private constructor(private readonly clientRepository: ClientRepository) {}

	public static getInstance() {
		if (!GetOneClientByUseCase.instance) {
			GetOneClientByUseCase.instance = new GetOneClientByUseCase(
				ClientRepository.getInstance(),
			);
		}
		return GetOneClientByUseCase.instance;
	}

	public async identifier(identifier: string) {
		return this.clientRepository.getByIdentifier(identifier);
	}
}
