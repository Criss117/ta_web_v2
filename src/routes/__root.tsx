import { Toaster } from "@ui/sonner";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <HeadContent />
      <TanStackRouterDevtools />
      <Toaster />
    </>
  ),
});
