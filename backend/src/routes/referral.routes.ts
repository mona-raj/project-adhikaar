import { Router } from "express";

import { prisma } from "../database/prisma";

import { asyncHandler } from "../utils/asyncHandler";

import { ReferralRepository } from "../repositories/ReferralRepository";

import { GetReferralService } from "../services/GetReferralService";

import { GetReferralController } from "../controllers/GetReferralController";

const router = Router();

const referralRepository = new ReferralRepository(prisma);

const getReferralService = new GetReferralService(referralRepository);

const getReferralController = new GetReferralController(getReferralService);

router.get(
  "/:id",
  asyncHandler(getReferralController.handle.bind(getReferralController)),
);

export default router;
