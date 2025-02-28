import { Loader } from "lucide-react";

import { Button } from "@ui/button";
import { Form, FormField } from "@ui/form";
import { FormItemInput } from "@form/form-item-input";

import { useProductForm } from "@products/application/hooks/use.product-form";
import type { ProductFormDto } from "@products/application/schemas/types";
import { toast } from "sonner";
import { ProductPrimitive } from "@products/domain/product.model";
import { MutationResponse } from "@shared/models/types";

const formItemsText = [
  {
    name: "barcode",
    label: "Código de barras",
    placeholder: "Código de barras",
    type: "text",
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Descripción",
    type: "text",
  },
] as const;

const formItemsNumber = [
  {
    name: "costPrice",
    label: "Precio de costo",
    placeholder: "Precio de costo",
    type: "number",
  },
  {
    name: "salePrice",
    label: "Precio de venta",
    placeholder: "Precio de venta",
    type: "number",
  },
  {
    name: "wholesalePrice",
    label: "Precio de mayorista",
    placeholder: "Precio de mayorista",
    type: "number",
  },
] as const;

const formItemsStock = [
  {
    name: "stock",
    label: "Existencia",
    placeholder: "Existencia",
    type: "number",
  },
  {
    name: "minStock",
    label: "Stock minimo",
    placeholder: "Stock minimo",
    type: "number",
  },
] as const;

interface Props {
  product?: ProductPrimitive;
  mutateFn: (product: ProductFormDto) => Promise<MutationResponse>;
}

export function ProductForm({ mutateFn, product }: Props) {
  const { form, isLoading, onSubmit } = useProductForm(product);

  const handleSubmit = async (data: ProductFormDto) => {
    if (isLoading) {
      toast("Ya se estan enviando los datos");
      return;
    }

    await onSubmit(data, mutateFn);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
        <fieldset className="space-y-5">
          {formItemsText.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-2">
          {formItemsNumber.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-2">
          {formItemsStock.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => <FormItemInput field={field} {...item} />}
            />
          ))}
        </fieldset>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader className="animate-spin" />}
          {!isLoading && <span>Guardar</span>}
        </Button>
      </form>
    </Form>
  );
}
