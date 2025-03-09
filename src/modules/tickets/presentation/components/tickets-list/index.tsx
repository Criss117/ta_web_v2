import { ScrollArea } from "@ui/scroll-area";
import { MonthAccordion } from "./month-accordion";
import { Accordion } from "@ui/accordion";
import { AccorItem } from "./accor-item";
import type { TicketYear } from "@/modules/tickets/domain/types";

interface Props {
	tickets: TicketYear;
	selectTicket: (ticketId: number) => void;
}

export function TicketsList({ tickets, selectTicket }: Props) {
	const multipleYears = Object.keys(tickets || {});

	if (multipleYears.length === 1) {
		const year = Number(multipleYears[0]);
		return (
			<ScrollArea className="w-full px-1 py-1 space-y-2 bg-light-300 min-h-[80%] h-[80%] max-h-[80%]">
				<MonthAccordion
					selectTicket={selectTicket}
					ticketsList={tickets[year]}
					className="w-full px-1 py-1 space-y-2 bg-light-300 h-full"
				/>
			</ScrollArea>
		);
	}

	return (
		<ScrollArea className="w-full px-1 py-1 space-y-2 bg-light-300 min-h-[80%] h-[80%] max-h-[80%]">
			<Accordion type="single" collapsible className="w-full space-y-2">
				{Object.keys(tickets).map((yearStr) => {
					const year = Number(yearStr);
					const month = tickets[year];
					return (
						<AccorItem
							key={yearStr}
							value={yearStr}
							trigger={yearStr}
							className="px-2 bg-black shadow-xl text-white"
						>
							<MonthAccordion ticketsList={month} selectTicket={selectTicket} />
						</AccorItem>
					);
				})}
			</Accordion>
		</ScrollArea>
	);
}
