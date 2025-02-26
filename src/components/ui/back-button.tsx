import { Button } from "./button";

export function BackButton() {
  return <Button onClick={() => window.history.back()}>Volver</Button>;
}
