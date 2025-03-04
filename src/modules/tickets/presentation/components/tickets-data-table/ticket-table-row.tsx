import { Link } from "@tanstack/react-router";
import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@ui/table";
import { useTicketsStore } from "@tickets/application/store/tickets.store";

import type { TicketDetailStore } from "@tickets/domain/types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  product: TicketDetailStore;
}

const TicketTableRow = ({ product }: Props) => {
  const changeSalePriceOrQuantity = useTicketsStore(
    (state) => state.changeSalePriceOrQuantity
  );

  const deleteDetail = useTicketsStore((state) => state.deleteDetail);

  const onChange = (salePrice: number, quantity: number) => {
    if (quantity < 1 || quantity > product.stock) return;

    changeSalePriceOrQuantity(product.barcode, salePrice, quantity);
  };

  const onDelete = () => {
    deleteDetail(product.barcode);
  };

  return (
    <TableRow
      className={cn(
        "hover:bg-light-primary-200/20 cursor-pointer transition-all"
      )}
    >
      <TableCell>{product.barcode}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>
        <Input
          min={1}
          type="number"
          value={product.salePrice === 0 ? "" : product.salePrice}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange(Number(e.target.value), product.quantity)}
        />
      </TableCell>
      <TableCell>
        <Input
          min={0}
          type="number"
          value={product.quantity === 0 ? "" : product.quantity}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onChange(product.salePrice, Number(e.target.value))}
        />
      </TableCell>
      <TableCell>{formatCurrency(product.subTotal)}</TableCell>
      <TableCell className={cn(product.currentStock < 5 && "text-red-500")}>
        {product.currentStock}
      </TableCell>
      <TableCell className="flex gap-x-2 justify-between">
        <Button className="w-1/2" variant="destructive" onClick={onDelete}>
          <Trash2 size={18} />
        </Button>
        <Button asChild className="w-1/2">
          <Link
            to="/dashboard/products/$barcode/edit"
            params={{ barcode: product.barcode }}
          >
            <SquarePen size={18} />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TicketTableRow;
