import { useState, useTransition } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import DeleteAlertDialog from "@ui/delete-alert-dialog";
import { useClients } from "@clients/application/hooks/use.clients";

interface Props {
  id: number;
}

export const DeleteClient = ({ id }: Props) => {
  const nav = useNavigate();
  const { page, size } = useSearch({ from: "/dashboard/_layout/clients/" });
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { deleteProduct } = useClients();

  const handleClick = () => {
    startTransition(async () => {
      const res = await deleteProduct(id);

      nav({
        to: "/dashboard/clients",
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
