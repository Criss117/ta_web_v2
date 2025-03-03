import { useState } from "react";

import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { useProducts } from "@products/application/hooks/use.products";
import type { ProductPrimitive } from "@products/domain/product.model";
import { X } from "lucide-react";

interface Props {
  searchByQueryFn: (product: ProductPrimitive) => void;
}

export function ProductSearchBarcode({ searchByQueryFn }: Props) {
  const [barCode, setBarCode] = useState("");
  const { getOneByBarcode } = useProducts();

  const clearQuery = () => {
    setBarCode("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (barCode.length === 0) return;

    const product = await getOneByBarcode(barCode);

    if (!product) return null;

    searchByQueryFn(product);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-x-5">
      <fieldset className="w-full relative">
        <Label htmlFor="barcode" className="text-xl text-light-text-200">
          Código de Barras:
        </Label>
        <Input
          type="text"
          id="barcode"
          placeholder="Código de Barras"
          value={barCode}
          onChange={(e) => setBarCode(e.target.value.trim())}
          autoFocus
        />
        <Button
          variant="ghost"
          className="absolute right-0 bottom-0 bg-transparent hover:bg-transparent"
          aria-label="Clear query"
          onClick={clearQuery}
        >
          <X />
        </Button>
      </fieldset>
      <Button type="submit">Agregar Producto</Button>
    </form>
  );
}
