import { toast } from "sonner";
import { Loader } from "lucide-react";

import { Button } from "@ui/button";
import { Form, FormField } from "@ui/form";
import { FormItemInput } from "@form/form-item-input";

import { useClientForm } from "@clients/application/hooks/use.client-form";
import type { MutationResponse } from "@shared/models/types";
import type { ClientFormDto, ClientPrimitive } from "@clients/domain/types";

interface Props {
  client?: ClientPrimitive;
  mutateFn: (client: ClientFormDto) => Promise<MutationResponse>;
}

const formItemsText = [
  {
    name: "identifier",
    label: "Número de indetificación",
    placeholder: "Número de indetificación",
    type: "text",
  },
  {
    name: "fullName",
    label: "Nombre completo",
    placeholder: "Nombre completo",
    type: "text",
  },
] as const;

const secondFormItemsText = [
  {
    name: "address",
    label: "Dirección",
    placeholder: "Dirección",
    type: "text",
  },
  {
    name: "phone",
    label: "Número de teléfono",
    placeholder: "Número de teléfono",
    type: "text",
  },
] as const;

const formItemsNumber = [
  {
    name: "creditLimit",
    label: "Limite de crédito",
    placeholder: "Limite de crédito",
    type: "number",
    step: "0.01",
    min: 0,
  },
] as const;

export function ClientForm({ client, mutateFn }: Props) {
  const { form, isLoading, onSubmit } = useClientForm(client);

  const handleSubmit = async (data: ClientFormDto) => {
    if (isLoading) {
      toast("Ya se estan enviando los datos");
      return;
    }

    await onSubmit(data, mutateFn);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
        <fieldset className="flex justify-between gap-x-2">
          {formItemsText.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItemInput field={field} {...item} className="w-1/2" />
              )}
            />
          ))}
        </fieldset>
        <fieldset className="flex justify-between gap-x-2">
          {secondFormItemsText.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItemInput field={field} {...item} className="w-1/2" />
              )}
            />
          ))}
        </fieldset>
        <fieldset>
          {formItemsNumber.map((item) => (
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
