import { useNavigate } from "@tanstack/react-router";
import { flexRender, type Table as ITable } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import { TableBodySkeleton } from "./table-body-skeleton";

interface Props<T> {
  isPending?: boolean;
  columnsLength: number;
  table: ITable<T>;
  navigateTo?: {
    to: string;
    objectName: string;
  };
  fallbackLabel?: string;
}

export function DataTable<T>({
  table,
  isPending = false,
  columnsLength,
  navigateTo,
  fallbackLabel,
}: Props<T>) {
  const nav = useNavigate();

  const rows = table.getRowModel().rows;
  return (
    <Table className="w-full">
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
                "hover:bg-light-accent-100/20 text-center",
                navigateTo && "cursor-pointer"
              )}
              onClick={() => {
                if (!navigateTo || !navigateTo.objectName) return;
                const data = row.original[navigateTo.objectName as keyof T];

                nav({
                  to: navigateTo.to,
                  params: {
                    [navigateTo.objectName]: data,
                  },
                });
              }}
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
            <TableCell colSpan={columnsLength} className="h-24 text-center">
              {fallbackLabel ?? "No hay Items"}
            </TableCell>
          </TableRow>
        )}

        {isPending && <TableBodySkeleton columnsLength={columnsLength} />}
      </TableBody>
    </Table>
  );
}
