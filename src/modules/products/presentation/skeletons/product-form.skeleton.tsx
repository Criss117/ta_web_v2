import { Button } from "@ui/button";
import { FormItemInputSkeleton } from "@/components/form/skeletons/form-item-input.skeleton";

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

export function ProductFormSkeleton() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
      <fieldset className="space-y-5">
        {formItemsText.map((item) => (
          <FormItemInputSkeleton key={item.name} label={item.label} />
        ))}
      </fieldset>
      <fieldset className="grid grid-cols-3 gap-2">
        {formItemsNumber.map((item) => (
          <FormItemInputSkeleton key={item.name} label={item.label} />
        ))}
      </fieldset>
      <fieldset className="grid grid-cols-3 gap-2">
        {formItemsStock.map((item) => (
          <FormItemInputSkeleton key={item.name} label={item.label} />
        ))}
      </fieldset>

      <Button type="submit" className="w-full" disabled>
        <span>Guardar</span>
      </Button>
    </form>
  );
}
