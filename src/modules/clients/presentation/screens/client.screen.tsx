import { BackButton } from "@/components/ui/back-button";
import { formatCurrency } from "@/lib/utils";
import type { ClientPrimitive } from "@clients/domain/client.model";
import { ClientInfo } from "../components/client-info";

interface Props {
  client: ClientPrimitive;
}

export function ClientScreen({ client }: Props) {
  return (
    <section className="w-full px-10 flex-grow flex flex-col">
      <header className="mt-5 relative">
        <BackButton className="absolute -translate-y-1/2 top-1/2 m-0" />
        <div className="flex mx-auto justify-between w-[70%]">
          <p className="text-xl">
            Saldo Actual:{" "}
            <span className="font-bold text-3xl">
              {formatCurrency(client.balance)}
            </span>
          </p>
          <p className="text-xl">
            Límite de crédito:{" "}
            <span className="font-bold text-3xl">
              {formatCurrency(client.creditLimit)}
            </span>{" "}
          </p>
        </div>
      </header>
      <ClientInfo client={client} />
    </section>
  );
}
