import { ScrollArea } from "@ui/scroll-area";
import type { DebtPaymentPrimitive } from "@debt-payment/domain/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import { format } from "@formkit/tempo";

interface Props {
	data: DebtPaymentPrimitive[];
	selectedDebtPayment: DebtPaymentPrimitive | null;
	setSelectedDebtPayment: (selectDebtPayment: DebtPaymentPrimitive) => void;
}

export function DebtPaymentTable({
	data,
	selectedDebtPayment,
	setSelectedDebtPayment,
}: Props) {
	return (
		<ScrollArea className="h-[80%] border rounded-sm">
			<Table>
				<TableHeader className="bg-lightprimary-100">
					<TableRow>
						<TableHead className="w-1/2 text-center text-black font-bold text-xl">
							Cantidad
						</TableHead>
						<TableHead className="w-1/2 text-center text-black font-bold text-xl">
							Fecha
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((item) => (
						<TableRow
							key={item.id}
							className={cn(
								"hover:bg-lighta-ccent-100 transition-all cursor-pointer ",
								selectedDebtPayment?.id === item.id
									? "bg-light-accent-100"
									: "",
							)}
							onClick={() => {
								setSelectedDebtPayment(item);
							}}
						>
							<TableCell className="text-center">
								{formatCurrency(item.amount)}
							</TableCell>
							<TableCell className="text-center">
								{format(new Date(item.createdAt || 0), "medium", "es")}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
}
