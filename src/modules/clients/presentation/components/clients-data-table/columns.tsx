import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import { format } from "@formkit/tempo";

import { Button } from "@ui/button";
import { DeleteClient } from "@clients/presentation/components/delete-client";
import type { ClientPrimitive } from "@clients/domain/types";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<ClientPrimitive>[] = [
	{
		accessorKey: "fullName",
		header: "Nombre",
	},
	{
		accessorKey: "phone",
		header: "Telefono",
	},
	{
		accessorKey: "balance",
		header: "Balance",
		cell: ({ row }) => {
			return formatCurrency(row.original.balance);
		},
	},
	{
		accessorKey: "creditLimit",
		header: "Limite de credito",
		cell: ({ row }) => {
			return formatCurrency(row.original.creditLimit);
		},
	},
	{
		accessorKey: "address",
		header: "Dirección",
	},
	{
		accessorKey: "createdAt",
		header: "Creado el",
		cell: ({ row }) => {
			return format(
				row.original.createdAt,
				{
					date: "long",
				},
				"es-CO",
			);
		},
	},
	{
		header: "Acciones",
		id: "actions",
		cell: ({ row }) => {
			const client = row.original;

			return (
				<div className="flex gap-x-2 justify-between z-50">
					<DeleteClient id={client.id} />
					<Button asChild className="w-1/2">
						<Link
							to="/dashboard/clients/$identifier/edit"
							params={{ identifier: client.identifier }}
							onClick={(e) => e.stopPropagation()}
						>
							<SquarePen size={18} />
						</Link>
					</Button>
				</div>
			);
		},
	},
];
