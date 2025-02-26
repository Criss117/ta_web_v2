import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";

import { cn } from "@/lib/utils";

import { ProductPrimitive } from "@products/domain/models/product.model";
import { TableBodySkeleton } from "./table-body-skeleton";
import { columns } from "./columns";
import { Paginable } from "@shared/models/types";

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

  const rows = table.getRowModel().rows;

  return (
    <Table className={cn("w-full")}>
      <TableHeader className="bg-light-accent-100 ">
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id} className="hover:bg-muted/0">
            {hg.headers.map((h) => (
              <TableHead
                key={h.id}
                className="text-center text-black text-base"
              >
                {h.isPlaceholder
                  ? null
                  : flexRender(h.column.columnDef.header, h.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {!isPending &&
          rows?.length > 0 &&
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                "hover:bg-light-accent-100/20 text-center"
                // navigateTo && "cursor-pointer"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="h-16">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}

        {!isPending && rows?.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No hay productos
            </TableCell>
          </TableRow>
        )}

        {isPending && <TableBodySkeleton />}
      </TableBody>
    </Table>
  );
}
