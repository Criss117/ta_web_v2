import { TableCell, TableRow } from "@ui/table";
import { columns } from "./columns";
import { Skeleton } from "@ui/skeleton";

export function TableBodySkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={columns.length} className="h-[73px]">
            <Skeleton className="w-full h-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
