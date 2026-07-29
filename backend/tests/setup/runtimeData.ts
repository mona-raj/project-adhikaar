import { clearRuntimeData } from "./database";

export async function resetRuntimeData() {
  await clearRuntimeData();
}
