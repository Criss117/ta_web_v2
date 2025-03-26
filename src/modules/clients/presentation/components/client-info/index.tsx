import { useEffect, useState, useTransition } from "react";

import { formatCurrency } from "@/lib/utils";
import { Separator } from "@ui/separator";
import { Button } from "@ui/button";
import { ScrollArea } from "@ui/scroll-area";

import { ActionsNav } from "@clients/presentation/components/actions-nav";
import { TicketDetailTable } from "@tickets/presentation/components/tickets-list/ticket-detail-table";
import { useTickets } from "@tickets/application/hooks/use.tickets";
import type { ClientPrimitive } from "@clients/domain/types";
import type { TicketDetailPrimitive, TicketYear } from "@tickets/domain/types";
import { TicketsMapper } from "@tickets/infrastructure/mappers/tickets.mapper";
import { TicketsList } from "@tickets/presentation/components/tickets-list";

interface Props {
	client: ClientPrimitive;
}

export function ClientInfo({ client }: Props) {
	const [isPending, startTransition] = useTransition();
	const [selectedDetail, setSelectedDetail] = useState<TicketDetailPrimitive[]>(
		[],
	);
	const [tickets, setTickets] = useState<TicketYear | null>(null);
	const { getByClient, getDetailByTicketId } = useTickets();

	const selectTicket = (ticketId: number) => {
		startTransition(async () => {
			const detail = await getDetailByTicketId(ticketId);

			setSelectedDetail(detail);
		});
	};

	useEffect(() => {
		getByClient(client.id).then((tickets) => {
			setTickets(TicketsMapper.domainToTicketYear(tickets));
		});
	}, [client.id]);

	return (
		<>
			<ActionsNav client={client} />
			<div className="flex mt-5 gap-x-10 flex-grow ">
				<div className="w-1/5">
					{tickets && (
						<TicketsList tickets={tickets} selectTicket={selectTicket} />
					)}
				</div>
				<div className="w-4/5 relative">
					<ScrollArea className="min-h-[80%] h-[80%] max-h-[80%] overflow-hidden">
						<TicketDetailTable
							ticketDetail={selectedDetail}
							isPending={isPending}
						/>
					</ScrollArea>
					<footer className="absolute bottom-[5%] w-full bg-light-300 h-16 flex justify-end">
						<p className="text-center my-auto text-xl font-semibold mx-10">
							Total:{" "}
							<span className="font-bold text-3xl mx-2">
								{formatCurrency(0)}
							</span>
						</p>
						<Separator orientation="vertical" />
						<div className="my-auto mx-10 space-x-5">
							<Button variant="destructive" disabled>
								Eliminar
							</Button>
						</div>
					</footer>
				</div>
			</div>
		</>
	);
}
