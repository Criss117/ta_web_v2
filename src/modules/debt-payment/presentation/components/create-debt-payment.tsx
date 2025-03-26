import { useState, useTransition } from "react";
import { CircleDollarSign } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog";
import { Separator } from "@ui/separator";
import { LoaderComponent } from "@ui/loader-component";
import { Form, FormField } from "@ui/form";
import { useDebtPayments } from "@debt-payment/application/hooks/use.debt-payments";
import { DebtPaymentFormSchema } from "@debt-payment/domain/debt-payment-form.schema";
import { FormItemInput } from "@/components/form/form-item-input";
import type { ClientPrimitive } from "@clients/domain/types";
import { useRouter } from "@tanstack/react-router";

const formItemsNumber = [
	{
		name: "amount",
		label: "Cantidad",
		placeholder: "Abono",
		type: "number",
		min: 0,
	},
	{
		name: "clientId",
		label: "Id del cliente",
		placeholder: "Id del cliente",
		type: "hidden",
		min: 0,
		hidden: true,
	},
] as const;

interface Props {
	client: ClientPrimitive;
}

export function CreateDebtPayment({ client }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const { create } = useDebtPayments();

	const form = useForm({
		resolver: zodResolver(DebtPaymentFormSchema),
		defaultValues: {
			amount: 0,
			clientId: client.id,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		if (data.amount > client.balance) {
			toast.error("El abono excede el saldo");
			return;
		}

		startTransition(async () => {
			await create(data.amount, data.clientId)
				.then(() => {
					toast.success("Abono creado");
					router.invalidate();
				})
				.catch(() => {
					toast.error("Error al crear el abono");
				});
			setIsOpen(false);
		});
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				if (isPending) return;
				setIsOpen(!isOpen);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="outline" className="space-x-2 ">
					<CircleDollarSign />
					<p>Abonar</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Abonar</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<Form {...form}>
					<form className="flex" onSubmit={onSubmit}>
						<fieldset className="w-2/3 mx-5">
							{formItemsNumber.map((item) => (
								<FormField
									key={item.name}
									control={form.control}
									name={item.name}
									render={({ field }) => (
										<FormItemInput
											field={field}
											{...item}
											className="w-[80%]"
										/>
									)}
								/>
							))}
						</fieldset>
						<Separator orientation="vertical" />
						<fieldset className="w-1/3 mx-5 space-y-2">
							<Button type="submit" className="w-full" disabled={isPending}>
								<LoaderComponent title="Abonar" isLoading={isPending} />
							</Button>
							<Button
								type="button"
								variant="destructive"
								className="w-full"
								onClick={() => setIsOpen(false)}
								disabled={isPending}
							>
								Cancelar
							</Button>
						</fieldset>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
