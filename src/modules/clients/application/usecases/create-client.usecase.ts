import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";
import type { ClientFormDto } from "@clients/domain/schemas/types";

export class CreateClientUseCase {
  static instance: CreateClientUseCase;

  private constructor(private readonly clientRepository: ClientRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CreateClientUseCase(ClientRepository.getInstance());
    }
    return this.instance;
  }

  public async execute(client: ClientFormDto) {
    return await this.clientRepository.create(client);
  }
}
