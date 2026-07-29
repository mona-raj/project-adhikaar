import { beforeEach, afterAll, beforeAll } from "vitest";

import { disconnectDatabase } from "./database";
import { setupReferenceData } from "./referenceData";
import { resetRuntimeData } from "./runtimeData";

beforeAll(async () => {
  await setupReferenceData();
});

beforeEach(async () => {
  await resetRuntimeData();
});

afterAll(async () => {
  await disconnectDatabase();
});
