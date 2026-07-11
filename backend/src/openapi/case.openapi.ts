import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { ApiTags } from "./common.openapi";
import { getCaseResponseSchema } from "../contracts/case/getCase.contract";
import { updateCaseServicesSchema } from "../validation/updateCaseServices.schema";
import { updateCaseServicesResponseSchema } from "../contracts/service/updateCaseServices.contract";
import z from "zod";

export function registerCase(registry: OpenAPIRegistry) {
  registerSchemas(registry);
  registerPaths(registry);
}

function registerSchemas(registry: OpenAPIRegistry) {
  registry.register("GetCaseResponse", getCaseResponseSchema);

  registry.register("UpdateCaseServices", updateCaseServicesSchema);

  registry.register(
    "UpdateCaseServicesResponse",
    updateCaseServicesResponseSchema,
  );
}

function registerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",
    path: "/cases/{id}",

    tags: [ApiTags.Cases],

    operationId: "getCase",

    summary: "Get a case",

    description:
      "Retrieves a case together with inferred services and generated recommendations.",

    request: {
      params: z.object({
        id: z.string(),
      }),
    },

    responses: {
      200: {
        description: "Case retrieved successfully.",
        content: {
          "application/json": {
            schema: getCaseResponseSchema,
          },
        },
      },

      404: {
        description: "Case not found.",
      },

      500: {
        description: "Internal server error.",
      },
    },
  });

  registry.registerPath({
    method: "put",

    path: "/cases/{id}/services",

    tags: [ApiTags.Cases],

    operationId: "updateCaseServices",

    summary: "Update selected services",

    description:
      "Updates the approved services for a case and regenerates recommendations.",

    request: {
      params: z.object({
        id: z.string(),
      }),

      body: {
        required: true,

        content: {
          "application/json": {
            schema: updateCaseServicesSchema,
          },
        },
      },
    },

    responses: {
      200: {
        description: "Case services updated successfully.",

        content: {
          "application/json": {
            schema: updateCaseServicesResponseSchema,
          },
        },
      },

      400: {
        description: "Invalid request.",
      },

      404: {
        description: "Case or service not found.",
      },

      500: {
        description: "Internal server error.",
      },
    },
  });
}
