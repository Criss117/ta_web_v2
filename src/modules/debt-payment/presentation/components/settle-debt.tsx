import { useState, useTransition } from "react";
import { useRouter } from "@tanstack/react-router";
import { CreditCard, Loader } from "lucide-react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@ui/alert-dialog";
import { Button } from "@ui/button";
import { useDebtPayments } from "@debt-payment/application/hooks/use.debt-payments";
import type { ClientPrimitive } from "@clients/domain/types";
import { toast } from "sonner";

interface Props {
	client: ClientPrimitive;
}

export function SettleDebt({ client }: Props) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const { settleDebt } = useDebtPayments();

	const onClick = async () => {
		startTransition(async () => {
			await settleDebt(client.id)
				.then(() => {
					router.invalidate();
					setIsOpen(false);
					toast.success("Adeudo liquidado");
				})
				.catch(() => {
					toast.error("Error al liquidar el adeudo");
				});
		});
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
				<Button variant="outline" className="space-x-2">
					<CreditCard />
					<p>Liquidar Adeudo</p>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Liquidar Adeudo</AlertDialogTitle>
					<AlertDialogDescription>
						Está seguro de liquidar el adeudo?{" "}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						className="w-1/2"
						disabled={isPending}
						onClick={(e) => e.stopPropagation()}
					>
						Cancelar
					</AlertDialogCancel>
					<Button
						disabled={isPending}
						className="w-1/2"
						onClick={(e) => {
							e.stopPropagation();
							onClick();
						}}
					>
						{isPending ? (
							<Loader className="h-5 w-5 animate-spin" />
						) : (
							"Liquidar Adeudo"
						)}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
