import { z } from "zod";

import { CaseStatus, SafetyStatus } from "../../generated/prisma/enums";

const helpRequestSummarySchema = z.object({
  id: z.string(),
  description: z.string(),
  declaredSafetyStatus: z.enum(SafetyStatus),
});

const serviceSummarySchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
});

export const getCaseResponseSchema = z.object({
  id: z.string(),

  status: z.enum(CaseStatus),

  evaluatedSafetyStatus: z.enum(SafetyStatus),

  helpRequest: helpRequestSummarySchema,

  services: z.array(serviceSummarySchema),
});

export type GetCaseResponse = z.infer<typeof getCaseResponseSchema>;
