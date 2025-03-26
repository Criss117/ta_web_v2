import { useEffect, useState, useTransition } from "react";
import { ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog";
import type { DebtPaymentPrimitive } from "@debt-payment/domain/types";
import type { ClientPrimitive } from "@clients/domain/types";
import { useDebtPayments } from "@debt-payment/application/hooks/use.debt-payments";
import { DebtPaymentTable } from "./debt-payment.table";

interface Props {
	client: ClientPrimitive;
}

export function DebtPaymentList({ client }: Props) {
	const router = useRouter();
	const [isDeleting, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState<DebtPaymentPrimitive[]>([]);
	const [selectedDebtPay, setSelectedDebtPay] =
		useState<DebtPaymentPrimitive | null>(null);

	const { findMany, deleteDebt } = useDebtPayments();

	const handleFindMany = async () => {
		findMany(client.id).then((data) => {
			setData(data);
		});
	};

	useEffect(() => {
		if (isOpen) {
			handleFindMany();
		}

		if (!isOpen) {
			setSelectedDebtPay(null);
		}

		return () => {
			setSelectedDebtPay(null);
		};
	}, [isOpen]);

	const onDelete = async () => {
		if (selectedDebtPay === null) {
			toast.error("Debe seleccionar un abono");
			return;
		}

		startTransition(async () => {
			await deleteDebt(selectedDebtPay.id || 0)
				.then(() => {
					toast.success("Abono eliminado");
					router.invalidate();
					handleFindMany();
					setSelectedDebtPay(null);
				})
				.catch(() => {
					toast.error("Error al eliminar el abono");
				});
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="space-x-2 ">
					<ReceiptText />
					<p>Detalle de abonos</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md max-h-[600px] h-[600px] flex flex-col">
				<DialogHeader className=" h-[10%] items-center">
					<DialogTitle>Detalle de abonos</DialogTitle>
					<DialogDescription>Lista de abonos</DialogDescription>
				</DialogHeader>
				<DebtPaymentTable
					data={data || []}
					selectedDebtPayment={selectedDebtPay}
					setSelectedDebtPayment={setSelectedDebtPay}
				/>
				<DialogFooter className="h-[10%] flex sm:justify-between">
					<Button onClick={() => setIsOpen(false)}>Cancelar</Button>
					<Button
						variant={selectedDebtPay === null ? "outline" : "destructive"}
						disabled={selectedDebtPay === null || isDeleting}
						onClick={onDelete}
					>
						Eliminar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
