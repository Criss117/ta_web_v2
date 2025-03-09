import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class DeleteClientUseCase {
	static instance: DeleteClientUseCase;

	private constructor(private readonly clientRepository: ClientRepository) {}

	public static getInstance() {
		if (!DeleteClientUseCase.instance) {
			DeleteClientUseCase.instance = new DeleteClientUseCase(
				ClientRepository.getInstance(),
			);
		}
		return DeleteClientUseCase.instance;
	}

	public async execute(id: number) {
		return await this.clientRepository.delete(id);
	}
}
