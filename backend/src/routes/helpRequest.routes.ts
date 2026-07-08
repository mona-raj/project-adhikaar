import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { validate } from "../middleware/validate.middleware";

import { createHelpRequestSchema } from "../validation/helpRequest.schema";

import { prisma } from "../database/prisma";

import { CreateHelpRequestService } from "../services/CreateHelpRequestService";

import { CreateHelpRequestController } from "../controllers/CreateHelpRequestController";

import { ProcessCaseService } from "../services/ProcessCaseService";

import { CaseRepository } from "../repositories/CaseRepository";

import { SafetyEvaluationService } from "../services/SafetyEvaluationService";

const router = Router();

const caseRepository = new CaseRepository(prisma);

const safetyEvaluationService = new SafetyEvaluationService(caseRepository);

const processCaseService = new ProcessCaseService(safetyEvaluationService);

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
