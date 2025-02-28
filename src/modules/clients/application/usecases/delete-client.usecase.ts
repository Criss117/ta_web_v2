import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class DeleteClientUseCase {
  static instance: DeleteClientUseCase;

  constructor(private readonly clientRepository: ClientRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DeleteClientUseCase(ClientRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(id: number) {
    return await this.clientRepository.delete(id);
  }
}
