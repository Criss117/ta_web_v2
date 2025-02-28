import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { ClientPrimitive } from "@clients/domain/client.model";
import { DeleteClient } from "@clients/presentation/components/delete-client";

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
  },
  {
    accessorKey: "creditLimit",
    header: "Limite de credito",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      return new Date(getValue() as Date).toLocaleDateString();
    },
  },
  {
    header: "Acciones",
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="flex gap-2 z-50">
          <DeleteClient id={client.id} />
          <Link
            className={cn("w-1/2", buttonVariants({ variant: "outline" }))}
            to="/dashboard/clients/$identifier/edit"
            params={{ identifier: client.identifier }}
            onClick={(e) => e.stopPropagation()}
          >
            Editar
          </Link>
        </div>
      );
    },
  },
];
