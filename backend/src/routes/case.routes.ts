import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { prisma } from "../database/prisma";

import { GetCaseController } from "../controllers/GetCaseController";

import { GetCaseService } from "../services/GetCaseService";

import { CaseRepository } from "../repositories/CaseRepository";

import { ServiceRepository } from "../repositories/ServiceRepository";

import { validate } from "../middleware/validate.middleware";

import { updateCaseServicesSchema } from "../validation/updateCaseServices.schema";

import { UpdateCaseServicesService } from "../services/UpdateCaseServicesService";

import { UpdateCaseServicesController } from "../controllers/UpdateCaseServicesController";

const router = Router();

const caseRepository = new CaseRepository(prisma);

const serviceRepository = new ServiceRepository(prisma);

const getCaseService = new GetCaseService(caseRepository);

const controller = new GetCaseController(getCaseService);

const updateCaseServicesService = new UpdateCaseServicesService(
  caseRepository,
  serviceRepository,
);

const updateCaseServicesController = new UpdateCaseServicesController(
  updateCaseServicesService,
);

router.get("/:id", asyncHandler(controller.handle.bind(controller)));

router.put(
  "/:id/services",
  validate(updateCaseServicesSchema),
  asyncHandler(
    updateCaseServicesController.handle.bind(updateCaseServicesController),
  ),
);

export default router;
