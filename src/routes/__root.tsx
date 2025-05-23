import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@ui/sonner";
import { DB } from "@shared/repositories";
import { Models } from "@shared/config/models.config";

export const Route = createRootRoute({
	beforeLoad: () => {
		DB.initializeDB(Models);
	},
	component: () => (
		<>
			<Outlet />
			<HeadContent />
			<TanStackRouterDevtools />
			<Toaster />
		</>
	),
});
