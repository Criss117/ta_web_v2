import { Separator } from "@ui/separator";
import { Button } from "@ui/button";
import { formatCurrency } from "@/lib/utils";

import { useTicketsStore } from "@tickets/application/store/tickets.store";
import { PayModal } from "./pay-modal";

export function TicketsFooter() {
  const ticket = useTicketsStore((state) => state.getSelectedTicket());

  const total =
    ticket?.detail.reduce((total, detail) => total + detail.subTotal, 0) || 0;

  return (
    <div className="fixed bottom-0 w-full bg-light-300 h-28 py-2 px-10 flex">
      <div className="h-full flex items-center w-1/2">
        <Button variant="default" className="w-52 my-auto">
          Ventas del día
        </Button>
      </div>
      <div className="h-full flex items-center  w-1/2">
        <div className="w-1/2 flex justify-end">
          {total === 0 && (
            <Button className="h-20 w-52" disabled>
              Cobrar
            </Button>
          )}
          {ticket !== null && <PayModal ticket={ticket} />}
        </div>
        <Separator orientation="vertical" className="mx-5" />
        <div className="w-1/2">
          <h3 className="text-4xl font-bold text-center">
            {formatCurrency(total || 0)}
          </h3>
        </div>
      </div>
    </div>
  );
}
