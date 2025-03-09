import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { columns } from "./colmuns";
import { TicketDetailPrimitive } from "@tickets/domain/types";

interface Props {
  ticketDetail: TicketDetailPrimitive[];
  isPending?: boolean;
}

export function TicketDetailTable({ ticketDetail, isPending }: Props) {
  const table = useReactTable({
    data: ticketDetail,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable
      table={table}
      columnsLength={columns.length}
      isPending={isPending}
    />
  );
}
