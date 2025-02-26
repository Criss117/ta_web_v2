import { SectionTitle } from "@ui/section-title";
import { Skeleton } from "@ui/skeleton";
import { ProductFormSkeleton } from "./product-form.skeleton";
import { SectionLayout } from "@ui/section-layout";
import { SectionHeader } from "@ui/section-header";
import { BackButton } from "@ui/back-button";

export function EditProductSkeleton() {
  return (
    <section>
      <SectionTitle>
        <span className="flex items-center space-x-2">
          <span>Editar Producto:</span>
          <Skeleton className="w-[80%] h-9" />
        </span>
      </SectionTitle>
      <SectionLayout>
        <SectionHeader>
          <BackButton />
        </SectionHeader>
        <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
          <ProductFormSkeleton />
        </div>
      </SectionLayout>
    </section>
  );
}
