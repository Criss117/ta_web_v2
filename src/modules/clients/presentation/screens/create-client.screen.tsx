import { BackButton } from "@ui/back-button";
import { SectionHeader } from "@ui/section-header";
import { SectionLayout } from "@ui/section-layout";
import { useClients } from "@clients/application/hooks/use.clients";
import { ClientForm } from "../components/client-form";

export function CreateClientScreen() {
  const { create } = useClients();

  return (
    <SectionLayout>
      <SectionHeader>
        <BackButton />
      </SectionHeader>
      <div className="mx-2 md:w-2/3 md:mx-auto lg:w-3/5 xl:w-1/3 m-auto mt-10">
        <ClientForm mutateFn={create} />
      </div>
    </SectionLayout>
  );
}
