import { TableCell, TableRow } from "@ui/table";
import { Skeleton } from "@ui/skeleton";

interface Props {
  columnsLength: number;
}

export function TableBodySkeleton({ columnsLength }: Props) {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={columnsLength} className="h-[73px]">
            <Skeleton className="w-full h-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
