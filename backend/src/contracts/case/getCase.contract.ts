import { z } from "zod";

import { CaseStatus, SafetyStatus, RecommendationStatus } from "../../generated/prisma/enums";

export const helpRequestSummarySchema = z.object({
  id: z.string(),
  description: z.string(),
  declaredSafetyStatus: z.enum(SafetyStatus),
});

export const serviceSummarySchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
});

const organizationSummarySchema = z.object({
  id: z.string(),
  name: z.string(),

  website: z.string().nullable(),

  email: z.string().nullable(),

  phone: z.string().nullable(),
});

const recommendationSummarySchema = z.object({
  id: z.string(),

  status: z.enum(RecommendationStatus),

  score: z.number().nullable(),

  reason: z.string().nullable(),

  service: serviceSummarySchema,

  organization: organizationSummarySchema,
});

export const getCaseResponseSchema = z.object({
  id: z.string(),

  status: z.enum(CaseStatus),

  evaluatedSafetyStatus: z.enum(SafetyStatus),

  helpRequest: helpRequestSummarySchema,

  services: z.array(serviceSummarySchema),

  recommendations: z.array(recommendationSummarySchema),
});

export type GetCaseResponse = z.infer<typeof getCaseResponseSchema>;
