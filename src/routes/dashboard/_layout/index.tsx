import { createFileRoute } from "@tanstack/react-router";
import { TicketsScreen } from "@tickets/presentation/screen/tickets.screen";

export const Route = createFileRoute("/dashboard/_layout/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Ta Web | Ventas",
      },
    ],
  }),
});

function RouteComponent() {
  return <TicketsScreen />;
}
