import { Router } from "express";

import healthRoutes from "./health.routes";
import helpRequestRoutes from "./helpRequest.routes";
import caseRoutes from "./case.routes";
import serviceRoutes from "./service.routes";
import recommendationRoutes from "./recommendation.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/help-requests", helpRequestRoutes);
router.use("/cases", caseRoutes);
router.use("/services", serviceRoutes);
router.use("/recommendations", recommendationRoutes);

export default router;
