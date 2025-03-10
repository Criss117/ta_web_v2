import { createFileRoute } from "@tanstack/react-router";

import { SectionTitle } from "@ui/section-title";
import { ProductsScreen } from "@products/presentation/screens/products.screen";
import {
	LimitSchema,
	PageSchema,
	QuerySchema,
} from "@/modules/shared/models/schemas";
import type { Pagination } from "@shared/models/types";

export const Route = createFileRoute("/dashboard/_layout/products/")({
	validateSearch: (search: Record<string, string>): Pagination => {
		const page = PageSchema.safeParse(search.page);
		const size = LimitSchema.safeParse(search.size);
		const query = QuerySchema.safeParse(search.query);

		return {
			page: page.success ? page.data : 1,
			size: size.success ? size.data : 20,
			query: query.success ? query.data : "",
		};
	},
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Ta Web | Productos",
			},
		],
	}),
});

function RouteComponent() {
	const { page, size, query } = Route.useSearch();

	return (
		<>
			<SectionTitle>Productos</SectionTitle>
			<ProductsScreen page={page} size={size} query={query} />
		</>
	);
}
