import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_layout/clients/$identifier/edit"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/_layout/clients/$identifier/edit"!</div>;
}
