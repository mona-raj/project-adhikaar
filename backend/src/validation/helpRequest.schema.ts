import { z } from "zod";
import { SafetyStatus } from "../generated/prisma/enums";

export const createHelpRequestSchema = z.object({
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000, "Description cannot exceed 5000 characters."),

  declaredSafetyStatus: z.enum(SafetyStatus).optional(),

  location: z
    .object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })
    .optional(),

  contactName: z.string().trim().min(2).max(100).optional(),

  contactEmail: z.email().optional(),

  contactPhone: z.string().trim().min(8).max(20).optional(),

  preferredLanguageCode: z
    .string()
    .trim()
    .regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Invalid language code.")
    .optional(),
});

export type CreateHelpRequestInput = z.infer<typeof createHelpRequestSchema>;
