import { SquarePen } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { format } from "@formkit/tempo";

import { Button } from "@ui/button";
import { formatCurrency } from "@/lib/utils";
import { DeleteProduct } from "../delete-product";
import { ProductPrimitive } from "@products/domain/types";

export const columns: ColumnDef<ProductPrimitive>[] = [
  {
    accessorKey: "barcode",
    header: "Código de Barras",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "costPrice",
    header: "Costo",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("costPrice"));
    },
  },
  {
    accessorKey: "salePrice",
    header: "Precio de venta",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("salePrice"));
    },
  },
  {
    accessorKey: "stock",
    header: "Existencias",
  },
  {
    accessorKey: "minStock",
    header: "Min. Existencias",
  },
  {
    accessorKey: "createdAt",
    header: "Creado el",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      if (!createdAt) {
        return "";
      }

      return format(
        createdAt,
        {
          date: "long",
        },
        "es-CO"
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-x-2 justify-between z-50">
          <DeleteProduct id={product.id} />
          <Button asChild className="w-1/2">
            <Link
              to="/dashboard/products/$barcode/edit"
              params={{ barcode: product.barcode }}
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
