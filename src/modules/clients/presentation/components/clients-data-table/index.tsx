import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import type { Paginable } from "@shared/models/types";
import type { ClientPrimitive } from "@clients/domain/types";

interface Props {
	clients: Paginable<ClientPrimitive>;
	isPending?: boolean;
}

export function ClientsDataTable({ clients, isPending }: Props) {
	const table = useReactTable({
		data: clients?.items,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<DataTable
			isPending={isPending || false}
			table={table}
			columnsLength={columns.length}
			navigateTo={{
				to: "/dashboard/clients/$identifier",
				objectName: "identifier",
			}}
		/>
	);
}
