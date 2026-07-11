import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const ApiTags = {
  HelpRequests: "Help Requests",
  Cases: "Cases",
  Organizations: "Organizations",
  Recommendations: "Recommendations",
  Referrals: "Referrals",
  Services: "Services",
  Resources: "Resources",
  Languages: "Languages",
} as const;

const errorResponseSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});

export function registerCommon(registry: OpenAPIRegistry) {
  registry.register("ErrorResponse", errorResponseSchema);
}
