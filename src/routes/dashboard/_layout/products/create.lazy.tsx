import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateProductScreen } from "@products/presentation/screens/create-product.screen";
import { SectionTitle } from "@ui/section-title";

export const Route = createLazyFileRoute("/dashboard/_layout/products/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <SectionTitle>Nuevo Producto</SectionTitle>
      <CreateProductScreen />
    </section>
  );
}
