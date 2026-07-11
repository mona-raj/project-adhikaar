import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { getReferralResponseSchema } from "../contracts/referral/getReferral.contract";

import { ApiTags } from "./common.openapi";

export function registerReferral(registry: OpenAPIRegistry) {
  registerSchemas(registry);
  registerPaths(registry);
}

function registerSchemas(registry: OpenAPIRegistry) {
  registry.register("GetReferralResponse", getReferralResponseSchema);
}

function registerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",

    path: "/referrals/{id}",

    tags: [ApiTags.Referrals],

    operationId: "getReferral",

    summary: "Get a referral",

    description:
      "Retrieves a referral together with the shared information and associated recommendation.",

    request: {
      params: z.object({
        id: z.string(),
      }),
    },

    responses: {
      200: {
        description: "Referral retrieved successfully.",

        content: {
          "application/json": {
            schema: getReferralResponseSchema,
          },
        },
      },

      404: {
        description: "Referral not found.",
      },

      500: {
        description: "Internal server error.",
      },
    },
  });
}
