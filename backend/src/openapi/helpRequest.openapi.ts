import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { createHelpRequestSchema } from "../validation/helpRequest.schema";
import { createHelpRequestResponseSchema } from "../contracts/helpRequest/createHelpRequest.contract";

import { ApiTags } from "./common.openapi";

export function registerHelpRequest(registry: OpenAPIRegistry) {
  registerSchemas(registry);
  registerPaths(registry);
}

function registerSchemas(registry: OpenAPIRegistry) {
  registry.register("CreateHelpRequest", createHelpRequestSchema);

  registry.register(
    "CreateHelpRequestResponse",
    createHelpRequestResponseSchema,
  );
}

function registerPaths(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "post",
    path: "/help-requests",

    tags: [ApiTags.HelpRequests],

    operationId: "createHelpRequest",

    summary: "Create a new help request",

    request: {
      body: {
        required: true,
        content: {
          "application/json": {
            schema: createHelpRequestSchema,
          },
        },
      },
    },

    responses: {
      201: {
        description: "Help request created successfully.",
        content: {
          "application/json": {
            schema: createHelpRequestResponseSchema,
          },
        },
      },

      400: {
        description: "Invalid request data.",
      },

      500: {
        description: "Internal server error.",
      },
    },
  });
}
