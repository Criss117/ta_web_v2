import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { SquarePen } from "lucide-react";

import { Button } from "@ui/button";
import { DeleteClient } from "@clients/presentation/components/delete-client";
import { ClientPrimitive } from "@clients/domain/types";

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
