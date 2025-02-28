import { useEffect, useState, useTransition } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import { Button } from "@ui/button";
import { cn } from "@/lib/utils";
import { SectionLayout } from "@ui/section-layout";
import { SectionHeader } from "@ui/section-header";
import { Pagination } from "@shared/models/types";
import { TablePag } from "@/components/data-table/table-pag";
import { SearchBarQuery } from "@/components/data-table/search-bar-query";

import { useClients } from "@clients/application/hooks/use.clients";
import { ClientsDataTable } from "@clients/presentation/components/clients-data-table";

import type { ClientPrimitive } from "@clients/domain/client.model";
import type { Paginable } from "@shared/models/types";

export function ClientsScreen({ page, size, query }: Pagination) {
  const nav = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { getMany } = useClients();
  const [clients, setClients] = useState<Paginable<ClientPrimitive>>({
    items: [],
    count: {
      totalItems: 0,
      totalPage: 0,
    },
  });

  const handleQuery = (querySearch: string) => {
    nav({
      to: "/dashboard/clients",
      search: {
        page: 1,
        size,
        query: querySearch,
      },
    });
  };

  const handleProducts = async () => {
    startTransition(async () => {
      const data = await getMany(page - 1, size, query);

      setClients(data);
    });
  };

  useEffect(() => {
    handleProducts();
  }, [page, size, query]);

  return (
    <SectionLayout className="space-y-4">
      <SectionHeader>
        <SearchBarQuery
          label="Buscar por nombre o identificador"
          searchByQueryFn={handleQuery}
        />
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/dashboard/clients/create">Crear un cliente</Link>
          </Button>
          <Button onClick={handleProducts} variant="outline">
            <RotateCcw className={cn(isPending && "animate-spin-reverse")} />
          </Button>
        </div>
      </SectionHeader>

      <TablePag page={page} size={size} count={clients.count} />
      <ClientsDataTable clients={clients} isPending={isPending} />
      <TablePag page={page} size={size} count={clients.count} />
    </SectionLayout>
  );
}
