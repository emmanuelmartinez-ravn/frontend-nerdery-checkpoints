import type { FormState } from "./formState";
import { describeState } from "./formState";

export function StatusBanner({ state }: { readonly state: FormState }) {
  if (state.status !== "error") {
    return <div>{describeState(state)}</div>;
  }
  return (
    <div>
      <span role="alert">{state.message}</span>
    </div>
  );
}
