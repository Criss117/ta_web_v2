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
  inHome: boolean;
  setInHome: (value: boolean) => void;
  disabled?: boolean;
}

export function ActionsNav({ inHome, disabled, setInHome }: Props) {
  return (
    <nav className="mt-5 space-x-5">
      <Button
        variant={inHome ? "default" : "outline"}
        className="space-x-2"
        disabled={disabled}
        onClick={() => setInHome(true)}
      >
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
      <Button
        variant={!inHome ? "default" : "outline"}
        className="space-x-2"
        disabled={disabled}
        onClick={() => setInHome(false)}
      >
        <BookCopy />
        <span>Reporte</span>
      </Button>
    </nav>
  );
}
