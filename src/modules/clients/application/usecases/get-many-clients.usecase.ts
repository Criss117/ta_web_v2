import { ClientRepository } from "@clients/infrastructure/repositories/client.repository";

export class GetManyClientsUseCase {
  static instance: GetManyClientsUseCase;

  constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new GetManyClientsUseCase();
    }
    return this.instance;
  }

  public async execute(page: number, size: number, query?: string) {
    const repository = ClientRepository.getInstance();

    return await repository.getPaginated(page, size, query);
  }
}
