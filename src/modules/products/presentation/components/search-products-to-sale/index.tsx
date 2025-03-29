import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { SearchBarQuery } from "@/components/data-table/search-bar-query";
import { Button } from "@ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog";
import { ProductsList } from "./products-list";
import type { ProductPrimitive } from "@products/domain/types";
import { toast } from "sonner";

interface Props {
	onSelect: (product: ProductPrimitive) => void;
}

export function SearchProductsToSale({ onSelect }: Props) {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductPrimitive>();

	useEffect(() => {
		if (!open) {
			setQuery("");
		}

		return () => {
			setQuery("");
		};
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="space-x-2" variant="outline">
					<Search className="w-4 h-4" />
					<p>Buscar</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-xl max-h-[600px] h-[600px] flex flex-col">
				<DialogHeader>
					<DialogTitle>Buscar Producto</DialogTitle>
					<DialogDescription />
					<SearchBarQuery
						label="Código de barras o descripción"
						searchByQueryFn={() => {
							console.log("hola");
						}}
					/>
				</DialogHeader>
				<ProductsList
					query={query}
					setSelectedProduct={setSelectedProduct}
					selectedProduct={selectedProduct}
				/>
				<DialogFooter className="flex justify-between sm:justify-between">
					<Button
						onClick={() => {
							if (!selectedProduct) {
								toast.error("Debes seleccionar un producto");
								return;
							}

							setOpen(false);
							onSelect(selectedProduct);
						}}
					>
						Aceptar
					</Button>
					<Button variant="destructive" onClick={() => setOpen(false)}>
						Cancelar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
