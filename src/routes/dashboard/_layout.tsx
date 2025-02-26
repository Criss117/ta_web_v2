import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/dashboard/_layout")({
  component: RouteComponent,
  pendingComponent: () => <Navbar />,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className="mt-32">
        <Outlet />
      </main>
    </>
  );
}
