import { useMemo } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { Pagination } from "@shared/models/types";

interface Props extends Pagination {
  count: {
    totalItems: number;
    totalPage: number;
  };
}

export const TablePag = ({ page, size, count }: Props) => {
  const { totalPage } = count;

  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPage ? page + 1 : totalPage;

  const disablePrevButton = page === 1 || totalPage === 0;
  const disableNextButton = page === totalPage;

  const outLineButtonClass = useMemo(() => {
    return `${buttonVariants({ variant: "outline" })}`;
  }, []);

  return (
    <div className="flex justify-end gap-x-5 my-2">
      <div className="flex justify-center items-center gap-x-10">
        <p>
          Página {page} de {totalPage}
        </p>
      </div>

      <div>
        {/* {first page */}
        <Link
          to="/dashboard/products"
          search={{
            page: 1,
            size,
          }}
          aria-label="First page"
          className={cn(
            outLineButtonClass,
            disablePrevButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronsLeft size={20} />
          </span>
        </Link>

        {/* previous page */}
        <Link
          to="/dashboard/products"
          search={{
            page: prevPage,
            size,
          }}
          aria-label="Previous page"
          className={cn(
            outLineButtonClass,
            disablePrevButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronLeft size={20} />
          </span>
        </Link>

        {/* next page */}
        <Link
          to="/dashboard/products"
          search={{
            page: nextPage,
            size,
          }}
          aria-label="Next page"
          className={cn(
            outLineButtonClass,
            disableNextButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronRight size={20} />
          </span>
        </Link>

        {/* last page */}
        <Link
          to="/dashboard/products"
          search={{
            page: totalPage,
            size,
          }}
          aria-label="Last page"
          className={cn(
            outLineButtonClass,
            disableNextButton && "cursor-default opacity-50 hover:bg-background"
          )}
        >
          <span>
            <ChevronsRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};
