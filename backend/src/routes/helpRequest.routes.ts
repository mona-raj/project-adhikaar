import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { validate } from "../middleware/validate.middleware";

import { createHelpRequestSchema } from "../validation/helpRequest.schema";

import { prisma } from "../database/prisma";

import { CreateHelpRequestService } from "../services/CreateHelpRequestService";

import { CreateHelpRequestController } from "../controllers/CreateHelpRequestController";

import { ProcessCaseService } from "../services/ProcessCaseService";

import { CaseRepository } from "../repositories/CaseRepository";

import { ServiceRepository } from "../repositories/ServiceRepository";

import { SafetyEvaluationService } from "../services/SafetyEvaluationService";

import { ServiceInferenceService } from "../services/ServiceInferenceService";

import { ServiceInferenceEngine } from "../domain/inference/ServiceInferenceEngine";

const router = Router();

const caseRepository = new CaseRepository(prisma);

const serviceRepository = new ServiceRepository(prisma);

const serviceInferenceEngine = new ServiceInferenceEngine();

const safetyEvaluationService = new SafetyEvaluationService(caseRepository);

const serviceInferenceService = new ServiceInferenceService(
  caseRepository,
  serviceRepository,
  serviceInferenceEngine,
);

const processCaseService = new ProcessCaseService(
  safetyEvaluationService,
  serviceInferenceService,
);

const createHelpRequestService = new CreateHelpRequestService(
  prisma,
  processCaseService,
);

const controller = new CreateHelpRequestController(createHelpRequestService);

router.post(
  "/",
  validate(createHelpRequestSchema),
  asyncHandler(controller.handle.bind(controller)),
);

export default router;
