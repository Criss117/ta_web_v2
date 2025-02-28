import { createFileRoute, redirect } from "@tanstack/react-router";
import { GetOneClientByUseCase } from "@clients/application/usecases/get-one-client-by.usecase";
import { SectionTitle } from "@ui/section-title";
import { EditClientScreen } from "@clients/presentation/screens/edit-client.screen";

export const Route = createFileRoute(
  "/dashboard/_layout/clients/$identifier/edit"
)({
  component: RouteComponent,
  loader: async ({ params: { identifier } }) => {
    const getOneBy = GetOneClientByUseCase.getInstance();

    const product = await getOneBy.identifier(identifier);

    if (!product) {
      throw redirect({
        to: "/dashboard/clients",
        search: { page: 1, size: 20 },
      });
    }

    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Ta Web | ${loaderData.fullName}`,
      },
    ],
  }),
});

function RouteComponent() {
  const client = Route.useLoaderData();

  return (
    <section>
      <SectionTitle>Editar Cliente: {client.fullName}</SectionTitle>
      <EditClientScreen client={client} />
    </section>
  );
}
