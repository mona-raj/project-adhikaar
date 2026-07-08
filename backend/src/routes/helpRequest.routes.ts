import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { validate } from "../middleware/validate.middleware";

import { createHelpRequestSchema } from "../validation/helpRequest.schema";

import { prisma } from "../database/prisma";

import { CreateHelpRequestService } from "../services/CreateHelpRequestService";

import { CreateHelpRequestController } from "../controllers/CreateHelpRequestController";

const router = Router();

const service = new CreateHelpRequestService(prisma);

const controller = new CreateHelpRequestController(service);

router.post(
  "/",
  validate(createHelpRequestSchema),
  asyncHandler(controller.handle.bind(controller)),
);

export default router;
