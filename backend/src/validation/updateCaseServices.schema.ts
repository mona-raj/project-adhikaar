import { z } from "zod";

export const updateCaseServicesSchema = z.object({
  serviceIds: z
    .array(z.string().trim().min(1))
    .min(1, "At least one service must be selected.")
    .refine(
      (ids) => new Set(ids).size === ids.length,
      "Duplicate service IDs are not allowed.",
    ),
});

export type UpdateCaseServicesInput = z.infer<typeof updateCaseServicesSchema>;
