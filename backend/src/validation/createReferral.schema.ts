import { z } from "zod";

export const createReferralSchema = z
  .object({
    contactName: z.string().trim().min(1),

    email: z.email().optional(),

    phone: z.string().trim().min(1).optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "At least one contact method is required.",
    path: ["email"],
  });

export type CreateReferralInput = z.infer<typeof createReferralSchema>;
