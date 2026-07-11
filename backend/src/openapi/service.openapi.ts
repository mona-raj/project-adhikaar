import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { getServicesResponseSchema } from "../contracts/service/getServices.contract";

import { ApiTags } from "./common.openapi";

export function registerService(registry: OpenAPIRegistry) {
  registerSchemas(registry);
  registerPaths(registry);
}

function registerSchemas(registry: OpenAPIRegistry) {
  registry.register("GetServicesResponse", getServicesResponseSchema);
}

function registerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",
    path: "/services",

    tags: [ApiTags.Services],

    operationId: "getServices",

    summary: "Get available services",

    description: "Retrieves all available support services.",

    responses: {
      200: {
        description: "Services retrieved successfully.",
        content: {
          "application/json": {
            schema: getServicesResponseSchema,
          },
        },
      },

      500: {
        description: "Internal server error.",
      },
    },
  });
}
