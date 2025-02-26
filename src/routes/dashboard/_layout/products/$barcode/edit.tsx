import { createFileRoute, redirect } from "@tanstack/react-router";
import { SectionTitle } from "@ui/section-title";
import { GetOneByUseCase } from "@products/application/usecases/get-one-by.usecase";
import { EditProductScreen } from "@products/presentation/screens/edit-product.screen";
import { EditProductSkeleton } from "@products/presentation/skeletons/edit-product.skeleton";

export const Route = createFileRoute(
  "/dashboard/_layout/products/$barcode/edit"
)({
  component: RouteComponent,
  loader: async ({ params: { barcode } }) => {
    const getOneByUseCase = GetOneByUseCase.getInstance();

    const product = await getOneByUseCase.barcode(barcode);

    if (!product) {
      throw redirect({
        to: "/dashboard/products",
        search: { page: 1, size: 20 },
      });
    }

    return product;
  },
  pendingComponent: () => (
    <section>
      <EditProductSkeleton />
    </section>
  ),
});

function RouteComponent() {
  const product = Route.useLoaderData();

  return (
    <section>
      <SectionTitle>Editar Producto: {product.description}</SectionTitle>
      <EditProductScreen product={product} />
    </section>
  );
}
