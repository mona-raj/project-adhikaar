import { z } from "zod";

import { ReferralStatus } from "../../generated/prisma/enums";

export const createReferralResponseSchema = z.object({
  id: z.string(),

  status: z.enum(ReferralStatus),

  recommendationId: z.string(),

  caseId: z.string(),

  createdAt: z.date(),
});

export type CreateReferralResponse = z.infer<
  typeof createReferralResponseSchema
>;
