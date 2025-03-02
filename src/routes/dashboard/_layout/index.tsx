import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@ui/section-title";

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
  return (
    <>
      <SectionTitle>Ventas</SectionTitle>
    </>
  );
}
