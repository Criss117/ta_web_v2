import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class GetOneClientByUseCase {
  static instance: GetOneClientByUseCase;

  constructor(private readonly clientRepository: ClientRepository) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GetOneClientByUseCase(ClientRepository.getInstance());
    }
    return this.instance;
  }

  public async identifier(identifier: string) {
    return this.clientRepository.getByIdentifier(identifier);
  }
}
