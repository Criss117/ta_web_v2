import { createLazyFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@ui/section-title";
import { CreateClientScreen } from "@clients/presentation/screens/create-client.screen";

export const Route = createLazyFileRoute("/dashboard/_layout/clients/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <SectionTitle>Nuevo Cliente</SectionTitle>
      <CreateClientScreen />
    </section>
  );
}
