import { createFileRoute } from "@tanstack/react-router";
import { LimitSchema, PageSchema, QuerySchema } from "@shared/models/schemas";
import type { Pagination } from "@shared/models/types";
import { SectionTitle } from "@ui/section-title";
import { ClientsScreen } from "@clients/presentation/screens/clients.screen";

export const Route = createFileRoute("/dashboard/_layout/clients/")({
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
        title: "Ta Web | Clientes",
      },
    ],
  }),
});

function RouteComponent() {
  const { page, size, query } = Route.useSearch();
  return (
    <>
      <SectionTitle>Clientes</SectionTitle>
      <ClientsScreen page={page} size={size} query={query} />
    </>
  );
}
