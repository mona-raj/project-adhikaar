import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { createReferralSchema } from "../validation/createReferral.schema";

import { createReferralResponseSchema } from "../contracts/referral/createReferral.contract";

import { ApiTags } from "./common.openapi";

export function registerRecommendation(registry: OpenAPIRegistry) {
  registerSchemas(registry);
  registerPaths(registry);
}

function registerSchemas(registry: OpenAPIRegistry) {
  registry.register("CreateReferral", createReferralSchema);

  registry.register("CreateReferralResponse", createReferralResponseSchema);
}

function registerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "post",

    path: "/recommendations/{id}/referral",

    tags: [ApiTags.Recommendations],

    operationId: "createReferral",

    summary: "Create a referral",

    description:
      "Creates a referral from an approved recommendation and shares the required information with the selected organization.",

    request: {
      params: z.object({
        id: z.string(),
      }),

      body: {
        required: true,

        content: {
          "application/json": {
            schema: createReferralSchema,
          },
        },
      },
    },

    responses: {
      201: {
        description: "Referral created successfully.",

        content: {
          "application/json": {
            schema: createReferralResponseSchema,
          },
        },
      },

      400: {
        description: "Invalid request.",
      },

      404: {
        description: "Recommendation not found.",
      },

      409: {
        description: "Referral already exists.",
      },

      500: {
        description: "Internal server error.",
      },
    },
  });
}
