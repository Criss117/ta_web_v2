import { useState } from "react";
import type { ClientPrimitive } from "@clients/domain/client.model";
import { ActionsNav } from "./actions-nav";

interface Props {
  client: ClientPrimitive;
}

export function ClientInfo({ client }: Props) {
  const [inHome, setInHome] = useState(true);

  console.log(client);

  return (
    <>
      <ActionsNav inHome={inHome} setInHome={setInHome} />
      {inHome && <div>in home</div>}
      {!inHome && <div>not in home</div>}
    </>
  );
}
