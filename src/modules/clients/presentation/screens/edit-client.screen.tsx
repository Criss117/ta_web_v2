import { BackButton } from "@ui/back-button";
import { SectionHeader } from "@ui/section-header";
import { SectionLayout } from "@ui/section-layout";
import { useClients } from "@clients/application/hooks/use.clients";
import { ClientForm } from "@clients/presentation/components/client-form";
import type { ClientPrimitive } from "@clients/domain/client.model";

interface Props {
  client: ClientPrimitive;
}

export function EditClientScreen({ client }: Props) {
  const { edit } = useClients();

  return (
    <SectionLayout>
      <SectionHeader>
        <BackButton />
      </SectionHeader>
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ClientForm
          mutateFn={(editedClient) => {
            return edit(client.id || -1, editedClient);
          }}
          client={client}
        />
      </div>
    </SectionLayout>
  );
}
