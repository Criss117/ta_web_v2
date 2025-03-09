import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@ui/scroll-area";
import { Input } from "@ui/input";
import { useDebounce } from "@shared/hooks/use.debounce";

import { useClients } from "@clients/application/hooks/use.clients";
import type { ClientPrimitive } from "@clients/domain/types";

interface Props {
	selectedClientId: number | undefined;
	onSelectClient: (client: ClientPrimitive) => void;
}

export function SimpleClientList({ selectedClientId, onSelectClient }: Props) {
	const { getMany } = useClients();

	const [clients, setClients] = useState<ClientPrimitive[]>([]);
	const [query, setQuery] = useState("");
	const queryDebaunce = useDebounce(query, 500);

	useEffect(() => {
		if (queryDebaunce.length >= 3 || queryDebaunce.length === 0) {
			getMany(0, 20, queryDebaunce).then(({ items }) => setClients(items));
		}
	}, [queryDebaunce]);

	return (
		<div className="flex justify-center mt-5 flex-col items-center gap-y-2 w-[80%] mx-auto">
			<Input
				value={query || ""}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full"
			/>
			<ScrollArea className="h-40 w-full border border-black">
				<ul
					className="space-y-2 mt-2"
					aria-labelledby="clients"
					aria-live="polite"
				>
					{clients.map((client) => (
						<li
							key={client.id}
							className={cn(
								"flex gap-x-5 justify-between px-3 hover:cursor-pointer hover:bg-light-300 transition-all",
								selectedClientId === client.id
									? "bg-light-primary-300 hover:bg-light-primary-300/90 text-white"
									: "odd:bg-light-300/50",
							)}
							onClick={() => onSelectClient(client)}
						>
							<p className="text-center">{client.identifier}</p>
							<p className="text-center">{client.fullName}</p>
						</li>
					))}
				</ul>
			</ScrollArea>
		</div>
	);
}
