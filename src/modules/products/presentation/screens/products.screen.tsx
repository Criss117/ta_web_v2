import { useEffect, useState, useTransition } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import { Button } from "@ui/button";
import { cn } from "@/lib/utils";
import { SectionLayout } from "@ui/section-layout";
import { SectionHeader } from "@ui/section-header";
import { Pagination } from "@shared/models/types";
import type { Paginable } from "@shared/models/types";

import { ProductsDataTable } from "@products/presentation/components/products-data-table";
import { ProductPrimitive } from "@products/domain/models/product.model";
import { useProducts } from "@products/application/hooks/use.products";
import { TablePag } from "../components/products-data-table/table-pag";
import { SearchBarQuery } from "../components/products-data-table/search-bar-query";

export function ProductsScreen({ page, size, query }: Pagination) {
  const nav = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { getMany } = useProducts();
  const [products, setProducts] = useState<Paginable<ProductPrimitive>>({
    items: [],
    count: {
      totalItems: 0,
      totalPage: 0,
    },
  });

  const handleQuery = (querySearch: string) => {
    nav({
      to: "/dashboard/products",
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

      setProducts(data);
    });
  };

  useEffect(() => {
    handleProducts();
  }, [page, size, query]);

  return (
    <SectionLayout className="space-y-4">
      <SectionHeader>
        <SearchBarQuery
          label="Buscar por descripción o código de barras"
          searchByQueryFn={handleQuery}
        />
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/dashboard/products/create">Crear un producto</Link>
          </Button>
          <Button onClick={handleProducts} variant="outline">
            <RotateCcw className={cn(isPending && "animate-spin-reverse")} />
          </Button>
        </div>
      </SectionHeader>

      <TablePag page={page} size={size} count={products.count} />
      <ProductsDataTable products={products} isPending={isPending} />
      <TablePag page={page} size={size} count={products.count} />
    </SectionLayout>
  );
}
