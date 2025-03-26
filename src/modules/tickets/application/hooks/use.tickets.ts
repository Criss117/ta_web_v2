import { CreateTicketUseCase } from "@tickets/application/usecases/create-ticket.usecase";
import { toast } from "sonner";
import { GetTicketsByClientUseCase } from "../usecases/get-tickets-by-client.usecase";
import type { TicketDetailStore } from "@/modules/tickets/domain/types";

export function useTickets() {
	const create = async (
		ticketDetail: TicketDetailStore[],
		clientId: number | null,
	) => {
		const createUseCase = CreateTicketUseCase.getInstance();

		return createUseCase
			.execute(ticketDetail, clientId)
			.then(() => {
				toast("Venta registrada", {
					description: "La venta se ha registrado correctamente",
				});

				return {
					success: true,
					error: null,
				};
			})
			.catch((err) => {
				const message =
					err.error || err.message || "Ocurrió un error realizar la operación";

				toast.error(message);

				return {
					success: false,
					error: message as string,
				};
			});
	};

	const getByClient = async (clientId: number) => {
		const getTicketsUseCase = GetTicketsByClientUseCase.getInstance();

		return getTicketsUseCase.findTickets(clientId);
	};

	const getDetailByTicketId = async (ticketId: number) => {
		const getTicketsUseCase = GetTicketsByClientUseCase.getInstance();

		return getTicketsUseCase.findTicketsDetailByTicketId(ticketId);
	};

	return { create, getByClient, getDetailByTicketId };
}
