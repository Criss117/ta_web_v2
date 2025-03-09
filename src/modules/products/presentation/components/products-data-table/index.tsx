import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { Paginable } from "@shared/models/types";
import type { ProductPrimitive } from "@products/domain/types";

interface Props {
	products: Paginable<ProductPrimitive>;
	isPending?: boolean;
}

export function ProductsDataTable({ products, isPending }: Props) {
	const table = useReactTable({
		data: products?.items,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<DataTable
			isPending={isPending || false}
			table={table}
			columnsLength={columns.length}
		/>
	);
}
