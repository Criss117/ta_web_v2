import { SquarePercent } from "lucide-react";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { TicketsNav } from "./tickets-nav";
import { SearchProductsToSale } from "@products/presentation/components/search-products-to-sale";
import type { ProductPrimitive } from "@products/domain/types";

interface Props {
	searchProduct: (product: ProductPrimitive) => void;
}

export function TicketsOptions({ searchProduct }: Props) {
	return (
		<>
			<div className="bg-light-primary-200 w-full p-2 rounded-lg flex gap-x-2">
				<SearchProductsToSale onSelect={searchProduct} />
				<Button size="sm" className="space-x-2" variant="outline" disabled>
					<SquarePercent className="w-4 h-4" />
					<p>Mayoreo</p>
				</Button>
				<Separator orientation="vertical" />
				<TicketsNav />
			</div>
		</>
	);
}
