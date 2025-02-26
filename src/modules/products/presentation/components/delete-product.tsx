import DeleteAlertDialog from "@ui/delete-alert-dialog";
import { useProducts } from "@products/application/hooks/use.products";
import { useState, useTransition } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

interface Props {
  id: number;
}

export const DeleteProduct = ({ id }: Props) => {
  const nav = useNavigate();
  const { page, size } = useSearch({ from: "/dashboard/_layout/products/" });
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { deleteProduct } = useProducts();

  const handleClick = () => {
    startTransition(async () => {
      const res = await deleteProduct(id);

      nav({
        to: "/dashboard/products",
        search: {
          page,
          size,
        },
      });

      setIsSuccess(res.success);
    });
  };

  return (
    <DeleteAlertDialog
      title="Está seguro de eliminar este producto?"
      description={() => (
        <span className="flex flex-col">
          El producto con el Código de Identificación {id} sera eliminado.
          <span>Esta operación no se puede deshacer.</span>
        </span>
      )}
      isPending={isPending}
      isSuccess={isSuccess}
      handleClick={handleClick}
    />
  );
};
