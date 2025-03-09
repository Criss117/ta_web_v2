import type { ColumnDef } from "@tanstack/react-table";
import type { TicketDetailPrimitive } from "@tickets/domain/types";

export const columns: ColumnDef<TicketDetailPrimitive>[] = [
  {
    accessorKey: "description",
    header: "Descripción del producto",
    cell: ({ row }) => {
      const description = row.original.description;

      return description ? description : "Sin descripción";
    },
  },
  {
    accessorKey: "salePrice",
    header: "Precio de venta",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "subTotal",
    header: "Subtotal",
  },
];
