import { BackButton } from "@ui/back-button";
import { SectionHeader } from "@ui/section-header";
import { SectionLayout } from "@ui/section-layout";
import { ProductForm } from "@products/presentation/components/product-form";
import { useProducts } from "@products/application/hooks/use.products";
import { ProductPrimitive } from "@products/domain/models/product.model";

interface Props {
  product: ProductPrimitive;
}

export function EditProductScreen({ product }: Props) {
  const { edit } = useProducts();

  return (
    <SectionLayout>
      <SectionHeader>
        <BackButton />
      </SectionHeader>
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ProductForm
          mutateFn={(editedProduct) => {
            return edit(product.id || -1, editedProduct);
          }}
          product={product}
        />
      </div>
    </SectionLayout>
  );
}
