import { ProductRepository } from "@/modules/products/infrastructure/repositories/product.repository";
import { TicketDetailModel } from "@tickets/domain/ticket-detail.model";
import type { TicketDetailPrimitive } from "@tickets/domain/types";

export class TicketDetailRepository {
  static instance: TicketDetailRepository;

  constructor(
    private readonly ticketDetailModel: TicketDetailModel,
    private readonly productRepository: ProductRepository
  ) {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new TicketDetailRepository(
        TicketDetailModel.getInstance(),
        ProductRepository.getInstance()
      );
    }
    return this.instance;
  }

  public async createMany(ticketDetails: Omit<TicketDetailPrimitive, "id">[]) {
    const created = await this.ticketDetailModel.bulkAdd(ticketDetails);

    const updateStockPromise = ticketDetails.map((td) => {
      return this.productRepository.updateStock(td.barcode, td.quantity);
    });

    await Promise.all(updateStockPromise);

    return created;
  }

  public async getManyByTicketId(ticketId: number) {
    return this.ticketDetailModel.getManyByField("ticketId", ticketId);
  }
}
