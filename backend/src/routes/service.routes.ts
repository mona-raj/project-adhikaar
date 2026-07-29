import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { dependencies } from "../application/dependencies";

const router = Router();

router.get(
  "/",
  asyncHandler(
    dependencies.controllers.getServicesController.handle.bind(
      dependencies.controllers.getServicesController,
    ),
  ),
);

export default router;
