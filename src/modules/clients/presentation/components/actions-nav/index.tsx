import {
  BookCopy,
  CircleDollarSign,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ActionsNavList = [
  {
    title: "Abonar",
    icon: CircleDollarSign,
  },
  {
    title: "Liquidar Adeudo",
    icon: CreditCard,
  },
  {
    title: "Detalles de abono",
    icon: ReceiptText,
  },
];

interface Props {
  disabled?: boolean;
}

export function ActionsNav({ disabled }: Props) {
  return (
    <nav className="mt-5 space-x-5">
      <Button variant="outline" className="space-x-2" disabled={disabled}>
        <BookCopy />
        <span>Inicio</span>
      </Button>
      {ActionsNavList.map(({ title, icon: Icon }) => {
        return (
          <Button
            key={title}
            variant="outline"
            className="space-x-2"
            disabled={disabled}
          >
            <Icon />
            <p>{title}</p>
          </Button>
        );
      })}
      <Button variant="outline" className="space-x-2" disabled={disabled}>
        <BookCopy />
        <span>Reporte</span>
      </Button>
    </nav>
  );
}
