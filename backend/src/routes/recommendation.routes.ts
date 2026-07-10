import { Router } from "express";

import { RecommendationRepository } from "../repositories/RecommendationRepository";

import { CreateReferralController } from "../controllers/CreateReferralController";

import { CreateReferralService } from "../services/CreateReferralService";

import { createReferralSchema } from "../validation/createReferral.schema";

import { validate } from "../middleware/validate.middleware";

import { asyncHandler } from "../utils/asyncHandler";

import { prisma } from "../database/prisma";

const router = Router();

const recommendationRepository = new RecommendationRepository(prisma);

const createReferralService = new CreateReferralService(
  prisma,
  recommendationRepository,
);

const createReferralController = new CreateReferralController(
  createReferralService,
);

router.post(
  "/:id/referral",
  validate(createReferralSchema),
  asyncHandler(createReferralController.handle.bind(createReferralController)),
);

export default router;
