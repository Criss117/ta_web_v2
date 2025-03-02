import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import type { ClientPrimitive } from "@clients/domain/client.model";
import type { ClientFormDto } from "@clients/domain/schemas/types";
import { ClientFormSchema } from "@clients/domain/schemas/client.schema";
import { MutationResponse } from "@shared/models/types";

export function useClientForm(client?: ClientPrimitive) {
  const [responseStatus, setResponseStatus] = useState<MutationResponse | null>(
    null
  );

  const nav = useNavigate();

  const form = useForm<ClientFormDto>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: client && { ...client },
  });

  const onSubmit = async (
    data: ClientFormDto,
    mutationFn: (client: ClientFormDto) => Promise<MutationResponse>
  ) => {
    form.clearErrors();

    await mutationFn(data)
      .then((res) => {
        form.reset();
        setResponseStatus(res);
        nav({
          to: "/dashboard/clients",
          search: {
            page: 1,
            size: 20,
          },
        });
      })
      .catch((err) => {
        const message =
          err.error ||
          err.message ||
          "Ocurrió un error al enviar el formulario";

        toast("Error", {
          description: message,
          style: {
            background: "var(--destructive)",
            borderColor: "var(--destructive)",
          },
        });
      });
  };

  return {
    form,
    responseStatus,
    isLoading: form.formState.isSubmitting,
    onSubmit,
  };
}
