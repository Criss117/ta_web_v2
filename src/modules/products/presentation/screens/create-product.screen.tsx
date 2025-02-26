import { BackButton } from "@/components/ui/back-button";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLayout } from "@/components/ui/section-layout";
import { ProductForm } from "@products/presentation/components/product-form";
import { useProducts } from "@products/application/hooks/use.products";

export function CreateProductScreen() {
  const { create } = useProducts();
  return (
    <SectionLayout>
      <SectionHeader>
        <BackButton />
      </SectionHeader>
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ProductForm mutateFn={create} />
      </div>
    </SectionLayout>
  );
}
