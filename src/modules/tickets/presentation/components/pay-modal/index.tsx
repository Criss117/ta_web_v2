import { useEffect, useState } from "react";
import { CircleDollarSign, User } from "lucide-react";
import { Button } from "@ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { CashPayment } from "./cash-payment";
import { SimpleClientList } from "@clients/presentation/components/simple-client-list";
import type { TicketState } from "@tickets/domain/types";
import { PayModalActions } from "./actions";
import { ClientPrimitive } from "@clients/domain/types";

interface Props {
  ticket: TicketState;
}

export function PayModal({ ticket }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCredit, setIsCredit] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientPrimitive | null>(
    null
  );

  const total = ticket.detail.reduce(
    (total, detail) => total + detail.subTotal,
    0
  );

  useEffect(() => {
    if (isOpen) return;

    setIsCredit(false);
    setSelectedClient(null);

    return () => {
      setIsCredit(false);
      setSelectedClient(null);
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-20 w-52">Cobrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl h-[70%] flex flex-col">
        <DialogHeader className="h-fit bg-light-300 p-2 mt-5">
          <DialogTitle>
            Cobrar:{" "}
            {selectedClient ? selectedClient.fullName : "Pago en Efectivo"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex h-full">
          <div className="bg-light-100 w-2/3 h-full">
            <header className="flex flex-col items-center gap-y-5">
              <h3 className="text-2xl">Total a cobrar</h3>
              <p className="text-5xl font-bold">{formatCurrency(total)}</p>
            </header>

            <ul className="flex items-center justify-center gap-x-20 mt-10">
              <Button
                variant={!isCredit ? "default" : "outline"}
                className="flex flex-col h-20 w-20"
                onClick={() => setIsCredit(false)}
              >
                <CircleDollarSign className="size-10" />
                <span>Efectivo</span>
              </Button>

              <Button
                variant={isCredit ? "default" : "outline"}
                className="flex flex-col h-20 w-20"
                onClick={() => setIsCredit(true)}
              >
                <User className="size-10" />
                <span>Crédito</span>
              </Button>
            </ul>
            {!isCredit && <CashPayment total={total} />}
            {isCredit && (
              <SimpleClientList
                onSelectClient={setSelectedClient}
                selectedClientId={selectedClient?.id}
              />
            )}
          </div>
          <div className="bg-light-primary-200 w-1/3 h-full space-y-5 p-2">
            <PayModalActions
              isCredit={isCredit}
              ticketDetail={ticket.detail}
              clientId={selectedClient?.id || null}
            />
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
