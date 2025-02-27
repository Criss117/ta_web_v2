import { GetManyClientsUseCase } from "../usecases/get-many-clients.usecase";

export function useClients() {
  const getMany = async (page: number, size: number, query?: string) => {
    const getManyClients = GetManyClientsUseCase.getInstance();

    return await getManyClients.execute(page, size, query);
  };

  return {
    getMany,
  };
}
