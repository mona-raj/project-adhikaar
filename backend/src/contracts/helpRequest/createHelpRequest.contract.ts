import { z } from "zod";
import { CaseStatus } from "../../generated/prisma/enums";

export const createHelpRequestResponseSchema = z.object({
  helpRequestId: z.string(),
  caseId: z.string(),
  status: z.enum(CaseStatus),
});

export type CreateHelpRequestResponse = z.infer<
  typeof createHelpRequestResponseSchema
>;
