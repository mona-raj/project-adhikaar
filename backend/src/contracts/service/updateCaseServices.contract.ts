import { z } from "zod";

export const updateCaseServicesResponseSchema = z.object({
  caseId: z.string(),
  serviceCount: z.number().int().nonnegative(),
});

export type UpdateCaseServicesResponse = z.infer<
  typeof updateCaseServicesResponseSchema
>;
