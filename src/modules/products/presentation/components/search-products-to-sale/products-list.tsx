import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@ui/scroll-area";
import { useProducts } from "@products/application/hooks/use.products";
import type { ProductPrimitive } from "@products/domain/types";
import type { Paginable } from "@shared/models/types";

interface Props {
	query: string;
	selectedProduct?: ProductPrimitive;
	setSelectedProduct: (product: ProductPrimitive) => void;
}

export function ProductsList({
	query,
	selectedProduct,
	setSelectedProduct,
}: Props) {
	const { getMany } = useProducts();
	const [products, setProducts] = useState<Paginable<ProductPrimitive>>({
		items: [],
		count: {
			totalItems: 0,
			totalPage: 0,
		},
	});

	const handleProducts = async () => {
		const data = await getMany(1, 10, query);

		setProducts(data);
	};

	useEffect(() => {
		handleProducts();
	}, [query]);

	return (
		<ScrollArea className="h-96 w-full border border-black">
			<ul className="space-y-2 mt-2">
				{products.items.map((product) => (
					<li
						key={product.id}
						className={cn(
							"flex gap-x-5 justify-between px-3 hover:cursor-pointer hover:bg-lightbg-300 transition-all ",
							selectedProduct?.id === product.id
								? "bg-light-primary-300 hover:bg-light-primary-300/90 text-white"
								: "[&:nth-child(odd)]:bg-light-300 [&:nth-child(even)]:bg-light-200",
						)}
						onClick={() => {
							setSelectedProduct(product);
						}}
					>
						<p className="text-center">{product.barcode}</p>
						<p className="text-center">{product.description}</p>
					</li>
				))}
			</ul>
		</ScrollArea>
	);
}
