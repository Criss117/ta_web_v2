import { useState } from "react";
import { ActionsNav } from "./actions-nav";
import type { ClientPrimitive } from "@clients/domain/types";

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
