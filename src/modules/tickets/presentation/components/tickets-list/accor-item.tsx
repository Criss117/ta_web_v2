import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/accordion";
import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	trigger: string;
	value: string;
	className?: string;
}

export const AccorItem = ({ value, children, trigger, className }: Props) => {
	return (
		<AccordionItem value={value}>
			<AccordionTrigger
				className={cn("w-full flex items-center justify-around h-8", className)}
			>
				<p>{trigger}</p>
			</AccordionTrigger>
			<AccordionContent>{children}</AccordionContent>
		</AccordionItem>
	);
};
