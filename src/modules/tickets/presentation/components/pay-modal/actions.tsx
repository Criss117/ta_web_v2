import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@ui/button";
import { LoaderComponent } from "@ui/loader-component";
import type { TicketState } from "@tickets/domain/types";
import { useTickets } from "@tickets/application/hooks/use.tickets";
import { useTicketsStore } from "@tickets/application/store/tickets.store";

interface Props {
	isCredit: boolean;
	ticket: TicketState;
	clientId: number | null;
	onSuccess: () => void;
}

export function PayModalActions({
	isCredit,
	ticket,
	clientId,
	onSuccess,
}: Props) {
	const [isPending, startTansition] = useTransition();
	const clearTicket = useTicketsStore((state) => state.clearTicket);
	const { create } = useTickets();

	const handleClick = () => {
		if (isCredit && clientId === null) {
			toast.error("Debe seleccionar un cliente");

			return;
		}

		startTansition(async () => {
			await create(ticket.detail, clientId).then((res) => {
				if (!res.success) return;

				clearTicket(ticket.temporaryId);
				onSuccess();
			});
		});
	};

	return (
		<Button className="w-full" onClick={handleClick} disabled={isPending}>
			<LoaderComponent
				title="Cobrar solo registrando la venta"
				isLoading={isPending}
			/>
		</Button>
	);
}
