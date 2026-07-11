import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { registerCommon } from "./common.openapi";
import { registerHelpRequest } from "./helpRequest.openapi";
import { registerCase } from "./case.openapi";
import { registerService } from "./service.openapi";
import { registerRecommendation } from "./recommendation.openapi";
import { registerReferral } from "./referral.openapi";

export const registry = new OpenAPIRegistry();

registerCommon(registry);

registerHelpRequest(registry);

registerCase(registry);

registerService(registry);

registerRecommendation(registry);

registerReferral(registry);
