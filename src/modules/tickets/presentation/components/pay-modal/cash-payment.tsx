import { useState } from "react";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { cn, formatCurrency } from "@/lib/utils";

interface Props {
  total: number;
}

export const CashPayment = ({ total }: Props) => {
  const [payWith, setPayWith] = useState(total);

  const chage = payWith - total;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isNaN(value)) {
      setPayWith(0);
      return;
    }

    setPayWith(value);
  };

  return (
    <div className="flex items-center justify-center gap-x-20 mt-10 flex-col gap-y-5">
      <fieldset className="flex items-center gap-x-2">
        <Label className="text-xl" id="pay-with">
          Pagó con:
        </Label>
        <Input
          className="w-32"
          placeholder={formatCurrency(total)}
          type="number"
          id="pay-with"
          value={payWith === 0 ? "" : payWith}
          onChange={onChange}
        />
      </fieldset>
      <p className="text-xl">
        Su cambio:{" "}
        <span className={cn(chage < 0 ? "text-red-500" : "text-green-500")}>
          {formatCurrency(chage)}
        </span>
      </p>
    </div>
  );
};
