import { createFileRoute, redirect } from "@tanstack/react-router";
import { SectionTitle } from "@ui/section-title";
import { GetOneClientByUseCase } from "@clients/application/usecases/get-one-client-by.usecase";
import { ClientScreen } from "@clients/presentation/screens/client.screen";

export const Route = createFileRoute("/dashboard/_layout/clients/$identifier/")(
	{
		component: RouteComponent,
		loader: async ({ params: { identifier } }) => {
			const getOneBy = GetOneClientByUseCase.getInstance();

			const client = await getOneBy.identifier(identifier);

			if (!client) {
				throw redirect({
					to: "/dashboard/clients",
					search: { page: 1, size: 20 },
				});
			}

			return client;
		},
		head: ({ loaderData }) => ({
			meta: [
				{
					title: `Ta Web | ${loaderData.fullName}`,
				},
			],
		}),
	},
);

function RouteComponent() {
	const client = Route.useLoaderData();

	return (
		<section className="h-full flex flex-col flex-grow">
			<SectionTitle>Estado de cuenta: {client.fullName}</SectionTitle>
			<ClientScreen client={client} />
		</section>
	);
}
