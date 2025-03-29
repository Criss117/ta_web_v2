import { SectionHeader } from "@ui/section-header";
import { SectionLayout } from "@ui/section-layout";

import { TicketsOptions } from "@tickets/presentation/components/tickets-options";
import { ProductSearchBarcode } from "@tickets/presentation/components/product-search-barcode";
import { useTicketsStore } from "@tickets/application/store/tickets.store";
import { TicketsDataTable } from "@tickets/presentation/components/tickets-data-table";
import { TicketsFooter } from "@tickets/presentation/components/tickets-footer";
import type { ProductPrimitive } from "@products/domain/types";

export function TicketsScreen() {
	const addTicketDetail = useTicketsStore((state) => state.addTicketDetail);

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
			<SectionLayout className="space-y-4 border-0 mt-0">
				<SectionHeader className="bg-light-200 flex-col space-y-5">
					<div className="w-1/3">
						<ProductSearchBarcode searchProduct={handleSearch} />
					</div>
					<TicketsOptions searchProduct={handleSearch} />
					<TicketsDataTable />
				</SectionHeader>
			</SectionLayout>
			<TicketsFooter />
		</>
	);
}
