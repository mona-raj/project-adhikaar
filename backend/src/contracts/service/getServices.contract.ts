import { z } from "zod";

const serviceSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export const getServicesResponseSchema = z.array(serviceSchema);

export type GetServicesResponse = z.infer<typeof getServicesResponseSchema>;
