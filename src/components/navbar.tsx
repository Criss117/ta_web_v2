import { BadgeDollarSign, Package, Users } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

import { Button } from "./ui/button";
import { Clock } from "./ui/clock";

import { Route as dashRoute } from "@/routes/dashboard/_layout/index";
import { Route as productsRoute } from "@/routes/dashboard/_layout/products";
import { Route as clientsRoute } from "@/routes/dashboard/_layout/clients";

import { DataBaseFactorySheet } from "./data-base-factory.sheet";

const NAVITEMS = [
  {
    name: "Ventas",
    href: dashRoute.to,
    Icon: BadgeDollarSign,
  },
  {
    name: "Clientes",
    href: clientsRoute.to,
    Icon: Users,
  },
  {
    name: "Productos",
    href: productsRoute.to,
    Icon: Package,
  },
] as const;

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="py-4 flex px-10 z-50 bg-light-200 fixed h-32 top-0 w-full justify-between shadow-md">
      <div className="flex justify-between flex-col gap-y-5">
        <h1 className="text-3xl font-bold text-lighttext-100">
          Tienda Andres - Web App
        </h1>
        <ul className="flex gap-5">
          {NAVITEMS.map(({ name, href, Icon }) => (
            <Button
              key={href}
              asChild
              variant={pathname + "/" === href ? "selected" : "outline"}
              className="gap-2"
            >
              <Link to={href}>
                <span>
                  <Icon size={20} />
                </span>
                {name}
              </Link>
            </Button>
          ))}
        </ul>
      </div>
      <div className="flex justify-between flex-col">
        <Clock />
        {/* <SyncNotification /> */}
      </div>

      <DataBaseFactorySheet />
    </nav>
  );
}
