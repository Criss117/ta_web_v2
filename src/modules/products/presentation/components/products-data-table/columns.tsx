import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { format } from "@formkit/tempo";

import { Button } from "@ui/button";
import { formatCurrency } from "@/lib/utils";
import { DeleteProduct } from "../delete-product";
import type { ProductPrimitive } from "@/modules/products/domain/product.model";

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
        <div className="flex gap-2">
          {product.id !== undefined && <DeleteProduct id={product.id} />}
          <Button asChild variant="outline">
            <Link
              className="w-1/2"
              to="/dashboard/products/$barcode/edit"
              params={{ barcode: product.barcode }}
            >
              Editar
            </Link>
          </Button>
        </div>
      );
    },
  },
];
