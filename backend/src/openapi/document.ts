import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { registry } from "./registry";

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.1.0",

  info: {
    title: "Project Adhikaar API",
    version: "1.0.0",
    description:
      "REST API for Project Adhikaar - connecting people in need with support organizations.",
  },

  servers: [
    {
      url: "/api/v1",
    },
  ],
});
