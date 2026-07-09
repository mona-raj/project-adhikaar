import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { prisma } from "../database/prisma";

import { GetServicesController } from "../controllers/GetServicesController";

import { GetServicesService } from "../services/GetServicesService";

import { ServiceRepository } from "../repositories/ServiceRepository";
import { util } from "zod";

const router = Router();

const serviceRepository = new ServiceRepository(prisma);

const getServicesService = new GetServicesService(serviceRepository);

const controller = new GetServicesController(getServicesService);

router.get("/", asyncHandler(controller.handle.bind(controller)));

export default router;
