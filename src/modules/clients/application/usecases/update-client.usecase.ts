import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import type { ClientFormDto } from "@clients/domain/types";

export class UpdateClientUseCase {
  static instance: UpdateClientUseCase;

  constructor(private readonly clientRepository: ClientRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UpdateClientUseCase(ClientRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(id: number, client: ClientFormDto) {
    return await this.clientRepository.edit(id, client);
  }
}
