import { useStore } from "zustand";

import { SectionHeader } from "@ui/section-header";
import { SectionLayout } from "@ui/section-layout";

import { TicketsOptions } from "@tickets/presentation/components/tickets-options";
import { ProductSearchBarcode } from "@tickets/presentation/components/product-search-barcode";
import { ticketsStore } from "@tickets/application/store/tickets.store";
import { TicketsDataTable } from "@tickets/presentation/components/tickets-data-table";

import { ProductPrimitive } from "@products/domain/product.model";

export function TicketsScreen() {
  const addTicketDetail = useStore(
    ticketsStore,
    (state) => state.addTicketDetail
  );

  const handleSearch = (product: ProductPrimitive) => {
    addTicketDetail({
      barcode: product.barcode,
      description: product.description,
      quantity: 1,
      salePrice: product.salePrice,
      subTotal: product.salePrice,
      wholeSalePrice: product.wholesalePrice,
      currentStock: product.stock,
      stock: product.stock,
    });
  };
  return (
    <>
      <SectionLayout className="space-y-4">
        <SectionHeader className="bg-light-200 flex-col space-y-5">
          <div className="w-1/3">
            <ProductSearchBarcode searchByQueryFn={handleSearch} />
          </div>
          <TicketsOptions />
        </SectionHeader>
        <div className="mx-10">
          <TicketsDataTable />
        </div>
      </SectionLayout>
    </>
  );
}
