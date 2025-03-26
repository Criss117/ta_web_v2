import {
	BookCopy,
	CircleDollarSign,
	CreditCard,
	ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateDebtPayment } from "@debt-payment/presentation/components/create-debt-payment";
import type { ClientPrimitive } from "@clients/domain/types";

const ActionsNavList = [
	{
		title: "Abonar",
		icon: CircleDollarSign,
		Cmp: CreateDebtPayment,
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
	client: ClientPrimitive;
}

export function ActionsNav({ disabled, client }: Props) {
	return (
		<nav className="mt-5 space-x-5">
			<Button variant="outline" className="space-x-2" disabled={disabled}>
				<BookCopy />
				<span>Inicio</span>
			</Button>
			{ActionsNavList.map(({ title, icon: Icon, Cmp }) => {
				if (Cmp) return <Cmp client={client} />;

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
