import { z } from "zod";

import {
  RecommendationStatus,
  ReferralStatus,
} from "../../generated/prisma/enums";

const recommendationSummarySchema = z.object({
  id: z.string(),
  status: z.enum(RecommendationStatus),
  score: z.number().nullable(),
  reason: z.string().nullable(),
});

const referralServiceSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
});

const referralOrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
});

const referralSharedDataSchema = z.object({
  contact: z.object({
    name: z.string(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
  }),

  helpRequest: z.object({
    description: z.string(),
  }),

  preferredLanguage: z
    .object({
      code: z.string(),
      name: z.string(),
    })
    .nullable(),

  service: z.object({
    code: z.string(),
    name: z.string(),
  }),
});

export const getReferralResponseSchema = z.object({
  id: z.string(),

  status: z.enum(ReferralStatus),

  createdAt: z.date(),

  recommendation: recommendationSummarySchema,

  service: referralServiceSchema,

  organization: referralOrganizationSchema,

  sharedData: referralSharedDataSchema,
});

export type GetReferralResponse = z.infer<typeof getReferralResponseSchema>;
