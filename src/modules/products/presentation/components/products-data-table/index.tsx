import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { columns } from "./columns";
import { Paginable } from "@shared/models/types";
import { DataTable } from "@/components/data-table";
import { ProductPrimitive } from "@products/domain/types";

interface Props {
  products: Paginable<ProductPrimitive>;
  isPending?: boolean;
}

export function ProductsDataTable({ products, isPending }: Props) {
  const table = useReactTable({
    data: products?.items || [],
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
